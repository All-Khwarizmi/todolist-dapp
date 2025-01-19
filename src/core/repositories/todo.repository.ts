import { Todo } from "../entities/todo";

export interface TodoRepository {
  getTodoList: () => Promise<Todo[] | null>;

  getOwner: () => Promise<string | null>;

  createTodo: (todoDefinition: string) => Promise<void>;
}
