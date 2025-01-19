import { Eip1193Provider, ethers } from "ethers";
import { TodoDto } from "../entities/todos/todo.dto";

export interface ProviderRepository {
  getProvider: () => Promise<ethers.BrowserProvider | null>;

  getSigner: () => Promise<ethers.Signer | null>;

  getTodoContract: () => Promise<ethers.Contract | null>;

}
