import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { TodoRepository } from "@/src/core/repositories/todo.repository";

export class TodoRepositoryImpl implements TodoRepository {
  private readonly _providerRepository: ProviderRepository;
  constructor(providerRepository: ProviderRepository) {
    this._providerRepository = providerRepository;
  }
  async getTodoList() {
    try {
      const contract = this._providerRepository.getTodoContract();

      const todos = [];
      const numOfTodos = await contract?.getNumOfTodos();
      for (let i = 0; i < numOfTodos; i++) {
        const _todo = await contract?.todoList(i);

        todos.push(_todo);
      }
      return todos;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
