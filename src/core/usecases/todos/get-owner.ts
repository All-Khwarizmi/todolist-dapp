import { TodoRepository } from "../../repositories/todo.repository";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/contexts/query-keys";

class GetTodoOwner {
  private _todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository;
  }

  async execute() {
    try {
      const owner = await this._todoRepository.getOwner();
      return owner;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}

export function useGetTodoOwner({
  todoRepository,
}: {
  todoRepository?: TodoRepository;
}) {
  let getTodoOwner;

  if (todoRepository) {
    getTodoOwner = new GetTodoOwner(todoRepository).execute();
  } else {
    getTodoOwner = null;
  }

  return useQuery({
    queryKey: [QUERY_KEYS.TODOS.GET_TODO_OWNER],
    queryFn: () => getTodoOwner,
  });
}
