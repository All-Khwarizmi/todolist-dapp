import { Todo } from "@/src/core/entities/todo";
import { TodoDto } from "@/src/core/entities/todo.dto";
import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { TodoRepository } from "@/src/core/repositories/todo.repository";

export class TodoRepositoryImpl implements TodoRepository {
  private readonly _providerRepository: ProviderRepository;
  constructor(providerRepository: ProviderRepository) {
    this._providerRepository = providerRepository;
  }
  async getTodoList() {
    const contract = this._providerRepository.getTodoContract();
    const todos: Todo[] = [];
    const numOfTodos = await contract.getNumOfTodos();
    for (let i = 0; i < numOfTodos; i++) {
      const _todo = await contract.todoList(i);
      const todo = TodoDto.toDomain(_todo);
      console.log(todo);
      todos.push(todo);
    }
    return todos;
  }
}
