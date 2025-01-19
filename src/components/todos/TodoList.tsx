"use client";
import { useGetTodoOwner } from "@/src/core/usecases/todos/get-owner";
import { useGetTodos } from "@/src/core/usecases/todos/get-todos";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { useEffect, useMemo, useState } from "react";

function TodoList() {
  const [isOwner, setIsOwner] = useState(false);

  const ctx = useWalletProvider();
  const {
    data: todos,
    isLoading,
    error,
  } = useGetTodos({
    todoRepository: ctx?.todoRepository,
  });

  const {
    data: owner,
    isLoading: ownerIsLoading,
    error: ownerError,
    refetch: refetchOwner,
  } = useGetTodoOwner({
    todoRepository: ctx?.todoRepository,
  });

  const connectedAccount = useMemo(() => {
    return ctx?.selectedAccount;
  }, [ctx?.selectedAccount]);

  useEffect(() => {
    if (owner) {
      console.log(
        "owner",
        owner.toUpperCase(),
        connectedAccount?.toUpperCase(),
        owner.toUpperCase() === connectedAccount?.toUpperCase()
      );
      setIsOwner(owner.toUpperCase() === connectedAccount?.toUpperCase());
    }
  }, [owner, connectedAccount]);

  useEffect(() => {
    refetchOwner();
  }, [ctx?.chainId, ctx?.selectedAccount]);

  if (ownerIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Todo List Owner</h1>
      {ownerIsLoading && <p>Loading...</p>}
      {ownerError && <p>Error: {ownerError.message}</p>}
      <p>{isOwner ? "You are the owner" : "You are not the owner"}</p>
      <h1 className="text-3xl font-bold">Todo List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {todos ? (
          todos?.map((todo) => (
            <li className="flex gap-4" key={todo.definition}>
              <input
                type="checkbox"
                defaultChecked
                name="todo"
                value={todo.definition}
              />
              {todo.definition}

              <p>{todo.createdAt.toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>No Todos</p>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
