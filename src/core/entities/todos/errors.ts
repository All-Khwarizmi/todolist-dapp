export class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContractError";
  }
}

export class UserRejectedError extends Error {
  constructor() {
    super("User rejected the transaction");
    this.name = "UserRejectedError";
  }
}
