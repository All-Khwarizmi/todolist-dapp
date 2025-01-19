import { Todo } from "../entities/todos/todo";

export interface TodoRepository {
  getTodoList: () => Promise<Todo[] | null>;

  getOwner: () => Promise<string | null>;

  createTodo: (todoDefinition: string) => Promise<void>;

  updateTodo: (index: number, updatedTodo: Partial<Todo>) => Promise<void>;
}
