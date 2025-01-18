"use client";
import { useGetTodos } from "@/src/core/usecases/todos/get-todos";

function TodoList() {
  const { data: todos, isLoading, error } = useGetTodos();

  return (
    <div>
      {" "}
      <h1>Todo List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {todos &&
          todos.map((todo) => (
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
          ))}
      </ul>
    </div>
  );
}

export default TodoList;
