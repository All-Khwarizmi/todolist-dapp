"use client";

import { useGetTodos } from "@/src/core/usecases/todos/get-todos";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {todos && todos.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.definition}
                  className="flex items-center space-x-2"
                >
                  <Checkbox id={todo.definition} defaultChecked />
                  <label
                    htmlFor={todo.definition}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {todo.definition}
                  </label>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {todo.createdAt.toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-center text-muted-foreground">No Todos</p>
        )}
      </CardContent>
    </Card>
  );
}

export default TodoList;
