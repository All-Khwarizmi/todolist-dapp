export enum Status {
  CREATED,
  UPDATED,
  DELETED,
}

export interface Todo {
  definition: string;
  status: Status;
  createdAt: Date;
}
