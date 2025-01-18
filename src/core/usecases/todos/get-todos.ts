import { inject } from "@/src/infrastructure/di/inject";
import { TodoDto } from "../../entities/todo.dto";
import { TodoRepository } from "../../repositories/todo.repository";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/store/query-keys";
const todoRepository = inject.todoRepository;

class GetTodos {
  private _todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository;
  }

  async execute() {
    const todos = await this._todoRepository.getTodoList();
    if (!todos) return null;
    const formattedTodos = todos?.map((todo) => TodoDto.toDomain(todo));
    return formattedTodos;
  }
}

const getTodos = new GetTodos(todoRepository).execute();

export function useGetTodos() {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS.GET_TODOS],
    queryFn: () => getTodos,
  });
}
