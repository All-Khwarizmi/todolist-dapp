import { TodoDto } from "../../entities/todos/todo.dto";
import { TodoRepository } from "../../repositories/todo.repository";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/store/query-keys";

class GetTodos {
  private _todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository;
  }

  async execute() {
    try {
      const todos = await this._todoRepository.getTodoList();

      if (!todos) return null;

      const formattedTodos = todos?.map((todo) => TodoDto.toDomain(todo));

      return formattedTodos;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}

export function useGetTodos({
  todoRepository,
}: {
  todoRepository?: TodoRepository;
}) {
  let getTodos;

  if (todoRepository) {
    getTodos = new GetTodos(todoRepository).execute();
  } else {
    getTodos = null;
  }

  return useQuery({
    queryKey: [QUERY_KEYS.TODOS.GET_TODOS],
    queryFn: () => getTodos,
  });
}
