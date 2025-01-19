"use client";
import { useGetTodos } from "@/src/core/usecases/todos/get-todos";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";

function TodoList() {
  const ctx = useWalletProvider();

  const {
    data: todos,
    isLoading,
    error,
  } = useGetTodos({
    todoRepository: ctx?.todoRepository,
  });

  return (
    <div className="flex flex-col gap-4">
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
