import { ModeToggle } from "@/src/components/ModeToggle";
import TodoList from "@/src/components/todos/TodoList";
import UserBalance from "@/src/components/todos/UserBalance";
import WalletConnect from "@/src/components/WalletConnect";

export default function Home() {
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
                <UserBalance />
              </li>
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
          <TodoList />
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://twitter.com/swarecito"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jason Suarez
          </a>
        </p>
      </footer>
    </div>
  );
}
