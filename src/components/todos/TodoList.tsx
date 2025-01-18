"use client";
import { Todo } from "@/src/core/entities/todo";
import { getTodos } from "@/src/core/usecases/todos/get-todos";
import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos.then((todos) => {
      console.log(todos);
      setTodos(todos);
    });
  }, []);
  return (
    <div>
      {" "}
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
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
