import { inject } from "@/src/infrastructure/di/inject";
import { TodoDto } from "../../entities/todo.dto";
import { TodoRepository } from "../../repositories/todo.repository";

const todoRepository = inject.todoRepository;

class GetTodos {
  private _todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this._todoRepository = todoRepository;
  }

  async execute() {
    const todos = await this._todoRepository.getTodoList();
    const formattedTodos = todos.map((todo) => TodoDto.toDomain(todo));
    return formattedTodos;
  }
}

export const getTodos = new GetTodos(todoRepository).execute();
