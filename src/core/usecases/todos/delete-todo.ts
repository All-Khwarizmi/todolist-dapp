import { TodoRepository } from "../../repositories/todo.repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/contexts/query-keys";
import { toast } from "sonner";

class DeleteTodo {
  private _todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository;
  }

  execute = async (index: number) => {
    try {
      await this._todoRepository?.deleteTodo(index);
      return true;
    } catch (error: any) {
      // MetaMask user rejection
      if (error.code === "ACTION_REJECTED") {
        throw new UserRejectedError();
      }

      // Contract revert errors
      if (error.code === "CALL_EXCEPTION") {
        throw new ContractError(error.reason || "Transaction failed");
      }

      // Gas estimation failures
      if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        throw new ContractError(
          "Transaction would fail - please check your inputs"
        );
      }

      // Insufficient funds
      if (error.code === "INSUFFICIENT_FUNDS") {
        throw new ContractError("Insufficient funds to delete todo");
      }

      // Network issues
      if (error.code === "NETWORK_ERROR") {
        throw new Error("Network error - please check your connection");
      }

      // Custom contract errors
      if (error.data) {
        const reason = error.data.message || error.message;
        throw new ContractError(reason);
      }

      // Unknown errors
      throw new Error(
        "Failed to delete todo: " + (error.message || "Unknown error")
      );
    }
  };
}

export function useDeleteTodo({
  todoRepository,
}: {
  todoRepository?: TodoRepository;
}) {
  const deleteTodo = todoRepository
    ? new DeleteTodo(todoRepository).execute
    : null;

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TODOS.DELETE_TODO],
    mutationFn: (index: number) =>
      deleteTodo ? deleteTodo(index) : Promise.resolve(false),
    onError: (error: Error) => {
      if (error instanceof UserRejectedError) {
        toast.error("Transaction cancelled", {
          position: "top-right",
          description: "You rejected the transaction",
        });
      } else if (error instanceof ContractError) {
        toast.error("Contract Error", {
          position: "top-right",
          description: error.message,
        });
      } else {
        toast.error("Error", {
          position: "top-right",
          description: error.message || "Something went wrong",
        });
      }
    },
    onSuccess: async () => {
      toast.success("Todo deleted successfully", {
        description: "Your todo has been deleted on the blockchain",
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS.GET_TODOS],
      });
    },
  });
}
