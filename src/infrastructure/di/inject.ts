import { ProviderRepository } from "../repositories/provider.impl";
import { TodoRepositoryImpl } from "../repositories/todos/todo.impl";

const providerRepository = new ProviderRepository();
const todoRepository = new TodoRepositoryImpl(providerRepository);

export const inject = {
  todoRepository,
};
