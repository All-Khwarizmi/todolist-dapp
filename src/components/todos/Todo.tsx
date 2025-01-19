"use client";

import { useState } from "react";
import { useUpdateTodo } from "@/src/core/usecases/todos/update-todo";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Status, type Todo } from "@/src/core/entities/todos/todo";
import { useDeleteTodo } from "@/src/core/usecases/todos/delete-todo";
import {
  QueryObserverResult,
  RefetchOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/contexts/query-keys";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TodoProps {
  index: number;
  todo: Todo;
  refetchTodos: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Todo[] | null, Error>>;
}

export function Todo({ index, todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDefinition, setEditedDefinition] = useState(todo.definition);
  const [editedStatus, setEditedStatus] = useState(todo.status);
  const ctx = useWalletProvider();
  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo({
    todoRepository: ctx?.todoRepository,
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo({
    todoRepository: ctx?.todoRepository,
  });

  const handleUpdate = (_todo?: Partial<Todo>) => {
    if (
      editedDefinition === todo.definition &&
      editedStatus === todo.status &&
      _todo === undefined
    ) {
      setIsEditing(false);
      return;
    }

    const updatedTodo: Partial<Todo> = {
      ...todo,
      ..._todo,
    };

    if (editedDefinition !== todo.definition) {
      updatedTodo.definition = editedDefinition;
    }
    if (editedStatus !== todo.status) {
      updatedTodo.status = editedStatus;
    }

    // Get current todos for rollback
    const previousTodos = queryClient.getQueryData<Todo[]>([
      QUERY_KEYS.TODOS.GET_TODOS,
    ]);

    // Optimistically update
    queryClient.setQueryData<Todo[]>([QUERY_KEYS.TODOS.GET_TODOS], (old) => {
      if (!old) return [];
      return old.map((t, i) => (i === index ? { ...t, ...updatedTodo } : t));
    });

    updateTodo(
      { index, updatedTodo },
      {
        onSuccess: async () => {
          setIsEditing(false);
          toast.success("Todo updated", {
            description: "Your todo has been successfully updated.",
          });
        },
        onError: (error: any) => {
          // Rollback to previous state
          queryClient.setQueryData([QUERY_KEYS.TODOS.GET_TODOS], previousTodos);
          toast.error("Error", {
            description: `${error.message}`,
          });
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    // Get current todos for rollback
    const previousTodos = queryClient.getQueryData<Todo[]>([
      QUERY_KEYS.TODOS.GET_TODOS,
    ]);

    // Optimistically remove the todo
    queryClient.setQueryData<Todo[]>([QUERY_KEYS.TODOS.GET_TODOS], (old) => {
      if (!old) return [];
      return old.filter((_, i) => i !== index);
    });

    deleteTodo(index, {
      onSuccess: async () => {
        toast.success("Todo deleted", {
          description: "Your todo has been successfully deleted.",
        });
      },
      onError: async (error: any) => {
        // Rollback to previous state
        queryClient.setQueryData([QUERY_KEYS.TODOS.GET_TODOS], previousTodos);
        toast.error("Error", {
          description: `Failed to delete todo: ${error.message}`,
        });
      },
    });
  };

  const parseStatus = (status: number): Status => {
    switch (status) {
      case 0:
        return Status.TODO;
      case 1:
        return Status.DOING;
      case 2:
        return Status.DONE;
      default:
        return Status.TODO;
    }
  };

  const fromStatusToString = (status: Status): string => {
    switch (status) {
      case Status.TODO:
        return "0";
      case Status.DOING:
        return "1";
      case Status.DONE:
        return "2";
      default:
        return "0";
    }
  };

  const handleStatusChange = (value: string) => {
    console.log(value);
    setEditedStatus(parseStatus(Number(value)));
    handleUpdate({
      status: parseStatus(Number(value)),
    });
  };

  return (
    <div className="flex flex-col gap-4 min-w-72 space-x-2">
      <div className="flex  flex-col space-x-2">
        {isEditing ? (
          <Input
            value={editedDefinition}
            onChange={(e) => setEditedDefinition(e.target.value)}
            className="flex-grow"
            disabled={isUpdating || isDeleting}
          />
        ) : (
          <span className="flex-grow">{todo.definition}</span>
        )}
        <span className="text-xs text-muted-foreground">
          {todo.createdAt.toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Select
          value={fromStatusToString(editedStatus)}
          onValueChange={handleStatusChange}
          disabled={isUpdating || isDeleting}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={fromStatusToString(Status.TODO)}>
              TODO
            </SelectItem>
            <SelectItem value={fromStatusToString(Status.DOING)}>
              DOING
            </SelectItem>
            <SelectItem value={fromStatusToString(Status.DONE)}>
              DONE
            </SelectItem>
          </SelectContent>
        </Select>

        {isEditing ? (
          <Button
            onClick={() => handleUpdate()}
            disabled={isUpdating || isDeleting}
            size="sm"
          >
            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            size="sm"
            variant="outline"
          >
            Edit
          </Button>
        )}
        <Button
          onClick={handleDelete}
          disabled={isUpdating || isDeleting}
          size="sm"
          variant="destructive"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
