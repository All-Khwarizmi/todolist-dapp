"use client";

import { useGetTodos } from "@/src/core/usecases/todos/get-todos";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Todo } from "./Todo";

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
              {todos.map((todo, index) => (
                <li key={index}>
                  <Todo index={index} todo={todo} />
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
