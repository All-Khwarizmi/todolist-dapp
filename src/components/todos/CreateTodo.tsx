"use client";

import { useCreateTodo } from "@/src/core/usecases/todos/create-todo";
import { useGetTodoOwner } from "@/src/core/usecases/todos/get-owner";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Todo } from "@/src/core/entities/todos/todo";
interface CreateTodoProps {
  refetchTodos: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Todo[] | null, Error>>;
}
function CreateTodo({ refetchTodos }: CreateTodoProps) {
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
  const {
    mutate: createTodo,
    isPending,
    isError,
    error,
  } = useCreateTodo({
    todoRepository: ctx?.todoRepository,
  });

  useEffect(() => {
    if (owner) {
      setIsOwner(owner.toUpperCase() === connectedAccount?.toUpperCase());
    }
  }, [owner, connectedAccount]);

  useEffect(() => {
    refetchOwner();
  }, [ctx?.chainId, ctx?.selectedAccount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoDefinition.trim()) {
      createTodo(todoDefinition, {
        onSuccess: async () => {
          await refetchTodos();
        },
      });
      setTodoDefinition("");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isOwner ? "Create Todo" : "Todo List Owner"}</CardTitle>
      </CardHeader>
      <CardContent>
        {ownerIsLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : ownerError ? (
          <Alert variant="destructive">
            <AlertDescription>{ownerError.message}</AlertDescription>
          </Alert>
        ) : isOwner ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter todo definition"
              value={todoDefinition}
              onChange={(e) => setTodoDefinition(e.target.value)}
              disabled={isPending}
            />
            <Button
              type="submit"
              disabled={isPending || !todoDefinition.trim()}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Todo"
              )}
            </Button>
            {isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error?.message ||
                    "An error occurred while creating the todo."}
                </AlertDescription>
              </Alert>
            )}
          </form>
        ) : (
          <p className="text-center text-muted-foreground">
            Connect as the owner to create a todo
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default CreateTodo;
