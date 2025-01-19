import { TodoRepository } from "../../repositories/todo.repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/store/query-keys";
import { toast } from "sonner";

class CreateTodo {
  private _todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository;
  }

  execute = async (todoDefinition: string) => {
    try {
      await this._todoRepository?.createTodo(todoDefinition);
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
        throw new ContractError("Insufficient funds to create todo");
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
        "Failed to create todo: " + (error.message || "Unknown error")
      );
    }
  };
}

export function useCreateTodo({
  todoRepository,
}: {
  todoRepository?: TodoRepository;
}) {
  const createTodo = todoRepository
    ? new CreateTodo(todoRepository).execute
    : null;

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TODOS.CREATE_TODO],
    mutationFn: (todoDefinition: string) =>
      createTodo ? createTodo(todoDefinition) : Promise.resolve(false),
    onError: (error: Error) => {
      // Handle different error types
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
    onSuccess: () => {
      toast.success("Todo created successfully", {
        description: "Your todo has been added to the blockchain",
      });

      // Invalidate todos query to refresh the list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS.GET_TODOS],
      });
    },
  });
}
