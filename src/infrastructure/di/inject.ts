import { ProviderRepositoryImpl } from "../repositories/provider.impl";
import { TodoRepositoryImpl } from "../repositories/todos/todo.impl";

const providerRepository = new ProviderRepositoryImpl();
const todoRepository = new TodoRepositoryImpl(providerRepository);

export const inject = {
  providerRepository,
  todoRepository,
};
