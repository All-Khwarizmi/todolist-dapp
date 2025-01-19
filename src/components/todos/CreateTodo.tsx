"use client";
import { useCreateTodo } from "@/src/core/usecases/todos/create-todo";
import { useGetTodoOwner } from "@/src/core/usecases/todos/get-owner";
import { useGetTodos } from "@/src/core/usecases/todos/get-todos";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { useEffect, useMemo, useState } from "react";

function CreateTodo() {
  const [isOwner, setIsOwner] = useState(false);

  const ctx = useWalletProvider();

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

  const [todoDefinition, setTodoDefinition] = useState("");
  const { mutate: createTodo } = useCreateTodo({
    todoRepository: ctx?.todoRepository,
  });

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
    <div>
      {isOwner ? (
        <div>
          <h1 className="text-3xl font-bold">Create Todo</h1>
          <input
            type="text"
            placeholder="Enter todo definition"
            onChange={(e) => setTodoDefinition(e.target.value)}
          />
          <button
            onClick={() => {
              createTodo(todoDefinition);
              // setTodoDefinition("");
            }}
          >
            Create Todo
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Todo List Owner</h1>
          {ownerIsLoading && <p>Loading...</p>}
          {ownerError && <p>Error: {ownerError.message}</p>}
          <p>{!isOwner && "Connect as the owner to create a todo"}</p>
        </div>
      )}
    </div>
  );
}

export default CreateTodo;
