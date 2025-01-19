export enum Status {
  TODO,
  DOING,
  DONE,
}

export interface Todo {
  definition: string;
  status: Status;
  createdAt: Date;
}
