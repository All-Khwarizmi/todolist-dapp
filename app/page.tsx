"use client";

import { ModeToggle } from "@/src/components/ModeToggle";
import CreateTodo from "@/src/components/todos/CreateTodo";
import TodoList from "@/src/components/todos/TodoList";
import UserBalance from "@/src/components/users/UserBalance";
import WalletConnect from "@/src/components/WalletConnect";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const ctx = useWalletProvider();
  const chainId = ctx?.chainId;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-between items-center">
            <div className="flex space-x-4">
              <li className="font-medium">Home</li>
              <li className="font-medium">About</li>
            </div>
            <div className="flex items-center space-x-4">
              <li>
                <UserBalance />
              </li>
              <li>
                <WalletConnect />
              </li>
              <li>
                <ModeToggle />
              </li>
            </div>
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          {chainId && chainId === "Sepolia" ? (
            <>
              <TodoList />
              <CreateTodo />
            </>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Network Error</AlertTitle>
              <AlertDescription>
                Please switch to Sepolia Network to use this application.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://twitter.com/swarecito"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              Jason Suarez
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
