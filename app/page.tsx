"use client";

import { ModeToggle } from "@/src/components/ModeToggle";
import WalletConnect from "@/src/components/WalletConnect";
import { Todo } from "@/src/core/entities/todo";
import { getTodos } from "@/src/core/usecases/todos/get-todos";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos.then((todos) => {
      console.log(todos);
      setTodos(todos);
    });
  }, []);
  return (
    <div className="flex flex-col justify-between h-screen pb-20">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start">
        <nav className="h-full w-full p-8">
          <ul className="flex  justify-between">
            <div className="flex  gap-4">
              <li> Home </li>
              <li> About </li>
            </div>
            <div className="flex gap-8 items-center">
              <li>
                <ModeToggle />
              </li>
              <li>
                <WalletConnect />{" "}
              </li>
            </div>
          </ul>
        </nav>
        <section>
          <h1>Todo List</h1>
          <ul>
            {todos.map((todo) => (
              <li key={todo.createdAt.toUTCString()}>{todo.definition}</li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
