import { ethers } from "ethers";
import { Status, Todo } from "../todo";

export class TodoDto {
  static toDomain(todo: any): Todo {
    const todoDefinition = todo[0];
    const todoStatus = this.parseStatus(Number(todo[1]));
    const todoCreatedAt = this.timestampToDate(Number(todo[2]));
    const _todo: Todo = {
      definition: todoDefinition,
      status: todoStatus,
      createdAt: todoCreatedAt,
    };
    return _todo;
  }

  static parseStatus(status: any): Status {
    const todoStatus = ethers.formatUnits(status, "wei");
    switch (Number(todoStatus)) {
      case 0:
        return Status.CREATED;
      case 1:
        return Status.UPDATED;
      case 2:
        return Status.DELETED;
      default:
        return Status.CREATED;
    }
  }

  static parseTimestamp(timestamp: any): number {
    return Number(ethers.formatUnits(timestamp, "wei"));
  }

  static timestampToDate(timestamp: any): Date {
    return new Date(Number(ethers.formatUnits(timestamp, "wei")) * 1000);
  }
}
