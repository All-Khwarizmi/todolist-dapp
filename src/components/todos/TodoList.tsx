"use client";
import { useGetTodos } from "@/src/core/usecases/todos/get-todos";

function TodoList() {
  const { data: todos, isLoading } = useGetTodos();

  return (
    <div>
      {" "}
      <h1>Todo List</h1>
      {isLoading && <p>Loading...</p>}
      <ul>
        {todos &&
          todos.map((todo) => (
            <li className="flex gap-4" key={todo.definition}>
              <input
                type="checkbox"
                name="todo"
                value={todo.definition}
                checked={todo.status === 0}
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
