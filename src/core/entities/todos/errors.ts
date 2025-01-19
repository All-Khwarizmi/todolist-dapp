class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContractError";
  }
}

class UserRejectedError extends Error {
  constructor() {
    super("User rejected the transaction");
    this.name = "UserRejectedError";
  }
}
