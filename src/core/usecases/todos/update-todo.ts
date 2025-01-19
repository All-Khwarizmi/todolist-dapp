import { TodoRepository } from "../../repositories/todo.repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/contexts/query-keys";
import { toast } from "sonner";
import { Todo } from "../../entities/todos/todo";

type UpdateTodoInput = {
  index: number;
  updatedTodo: Partial<Todo>;
};

class UpdateTodo {
  private _todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository;
  }

  execute = async ({ index, updatedTodo }: UpdateTodoInput) => {
    try {
      return this._todoRepository.updateTodo(index, updatedTodo);
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
        throw new ContractError("Insufficient funds to update todo");
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
        "Failed to update todo: " + (error.message || "Unknown error")
      );
    }
  };
}

export function useUpdateTodo({
  todoRepository,
}: {
  todoRepository?: TodoRepository;
}) {
  const updateTodo = todoRepository
    ? new UpdateTodo(todoRepository).execute
    : null;

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TODOS.UPDATE_TODO],
    mutationFn: async (input: UpdateTodoInput) => {
      if (!updateTodo) return false;
      // Wait for the update
      const result = await updateTodo(input);
      return result;
    },
    onError: (err, newTodo, context) => {
      if (err instanceof UserRejectedError) {
        toast.error("Transaction cancelled", {
          position: "top-right",
          description: "You rejected the transaction",
        });
      } else if (err instanceof ContractError) {
        toast.error("Contract Error", {
          position: "top-right",
          description: err.message,
        });
      } else {
        toast.error("Error", {
          position: "top-right",
          description: err.message || "Something went wrong",
        });
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS.GET_TODOS],
      });
    },
  });
}
