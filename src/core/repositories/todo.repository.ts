import { Todo } from "../entities/todo";

export interface TodoRepository {
  getTodoList: () => Promise<Todo[] | null>;
}
