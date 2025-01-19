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
      console.log("🚀 createTodo this", this);

      await this._todoRepository?.createTodo(todoDefinition);

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  };
}

export function useCreateTodo({
  todoRepository,
}: {
  todoRepository?: TodoRepository;
}) {
  let createTodo;

  if (todoRepository) {
    const createTodoInstance = new CreateTodo(todoRepository);

    createTodo = createTodoInstance.execute;
  } else {
    createTodo = null;
  }
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TODOS.CREATE_TODO],
    mutationFn: (todoDefinition: string) =>
      createTodo ? createTodo(todoDefinition) : Promise.resolve(false),
    onSettled: (data, error) => {
      if (error) {
        toast.error(error.message, { position: "top-right" });
        return;
      }
      if (data) {
        toast.success("Todo created successfully", { position: "top-right" });
        return;
      }
      toast.error("Something went wrong", { position: "top-right" });

      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEYS.TODOS.GET_TODOS],
        })
        .then(console.info);
    },
  });
}
