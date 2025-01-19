import { Todo } from "@/src/core/entities/todos/todo";
import { ProviderRepository } from "@/src/core/repositories/provider.repository";
import { TodoRepository } from "@/src/core/repositories/todo.repository";
import { ethers } from "ethers";

export class TodoRepositoryImpl implements TodoRepository {
  private readonly _providerRepository: ProviderRepository;
  constructor(providerRepository: ProviderRepository) {
    this._providerRepository = providerRepository;
  }
  async getTodoList() {
    try {
      const contract = await this._providerRepository.getTodoContract();

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

  async getOwner() {
    try {
      const contract = await this._providerRepository.getTodoContract();

      const owner = await contract?.owner();

      return owner;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createTodo(todoDefinition: string) {
    try {
      const signer = await this._providerRepository.getSigner();
      if (!signer) throw new Error("Failed to get signer");

      const contract = await this._providerRepository.getTodoContract();
      if (!contract) throw new Error("Failed to get contract");

      const tx = await contract.createTodo(todoDefinition, {
        value: ethers.parseEther("0.01"),
      });

      await tx.wait();
    } catch (error: any) {
      // MetaMask user rejection
      if (error.code === "ACTION_REJECTED") {
        throw new UserRejectedError();
      }

      // Contract revert errors
      if (error.code === "CALL_EXCEPTION") {
        const message = error.reason || "Transaction reverted";
        throw new ContractError(message);
      }

      // Gas estimation failures
      if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        throw new ContractError("Transaction would fail - check your inputs");
      }

      // Network issues
      if (error.code === "NETWORK_ERROR") {
        throw new Error("Network error - please check your connection");
      }

      // Custom contract errors (from require statements)
      if (error.data) {
        // Extract custom error data
        const reason = error.data.message || error.message;
        throw new ContractError(reason);
      }

      // Unknown errors
      throw new Error("Transaction failed: " + error.message);
    }
  }

  async updateTodo(index: number, updatedTodo: Partial<Todo>) {
    try {
      const signer = await this._providerRepository.getSigner();
      if (!signer) throw new Error("Failed to get signer");

      const contract = await this._providerRepository.getTodoContract();
      if (!contract) throw new Error("Failed to get contract");

      const tx = await contract.updateTodo(
        index,
        updatedTodo.status,
        updatedTodo.definition
      );

      await tx.wait();

      return true;
    } catch (error: any) {
      // MetaMask user rejection
      if (error.code === "ACTION_REJECTED") {
        throw new UserRejectedError();
      }

      // Contract revert errors
      if (error.code === "CALL_EXCEPTION") {
        const message = error.reason || "Transaction reverted";
        throw new ContractError(message);
      }

      // Gas estimation failures
      if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        throw new ContractError("Transaction would fail - check your inputs");
      }

      // Network issues
      if (error.code === "NETWORK_ERROR") {
        throw new Error("Network error - please check your connection");
      }

      // Custom contract errors (from require statements)
      if (error.data) {
        // Extract custom error data
        const reason = error.data.message || error.message;
        throw new ContractError(reason);
      }

      // Unknown errors
      throw new Error("Transaction failed: " + error.message);
    }
  }

  async deleteTodo(index: number) {
    try {
      const signer = await this._providerRepository.getSigner();
      if (!signer) throw new Error("Failed to get signer");

      const contract = await this._providerRepository.getTodoContract();
      if (!contract) throw new Error("Failed to get contract");

      const tx = await contract.deleteTodo(index);

      await tx.wait();
    } catch (error: any) {
      // MetaMask user rejection
      if (error.code === "ACTION_REJECTED") {
        throw new UserRejectedError();
      }

      // Contract revert errors
      if (error.code === "CALL_EXCEPTION") {
        const message = error.reason || "Transaction reverted";
        throw new ContractError(message);
      }

      // Gas estimation failures
      if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        throw new ContractError("Transaction would fail - check your inputs");
      }

      // Network issues
      if (error.code === "NETWORK_ERROR") {
        throw new Error("Network error - please check your connection");
      }

      // Custom contract errors (from require statements)
      if (error.data) {
        // Extract custom error data
        const reason = error.data.message || error.message;
        throw new ContractError(reason);
      }

      // Unknown errors
      throw new Error("Transaction failed: " + error.message);
    }
  }
}
