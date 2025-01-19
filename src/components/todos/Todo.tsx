"use client";

import { useState } from "react";
import { useUpdateTodo } from "@/src/core/usecases/todos/update-todo";
import { useDeleteTodo } from "@/src/core/usecases/todos/delete-todo";
import { useWalletProvider } from "@/src/hooks/wallet/use-wallet-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Todo } from "@/src/core/entities/todos/todo";

interface TodoProps {
  index: number;
  todo: Todo;
}

export function Todo({ index, todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDefinition, setEditedDefinition] = useState(todo.definition);
  const [editedStatus, setEditedStatus] = useState(todo.status);
  const ctx = useWalletProvider();

  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo({
    todoRepository: ctx?.todoRepository,
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo({
    todoRepository: ctx?.todoRepository,
  });

  const handleUpdate = () => {
    if (editedDefinition === todo.definition && editedStatus === todo.status) {
      setIsEditing(false);
      return;
    }

    const updatedTodo: Partial<TodoType> = {};
    if (editedDefinition !== todo.definition) {
      updatedTodo.definition = editedDefinition;
    }
    if (editedStatus !== todo.status) {
      updatedTodo.status = editedStatus;
    }

    updateTodo(
      { index, updatedTodo },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Todo updated", {
            description: "Your todo has been successfully updated.",
          });
        },
        onError: (error: any) => {
          toast.error("Error", {
            description: `Failed to update todo: ${error.message}`,
          });
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteTodo(index, {
      onSuccess: () => {
        toast.success("Todo deleted", {
          description: "Your todo has been successfully deleted.",
        });
      },
      onError: (error: any) => {
        toast.error("Error", {
          description: `Failed to delete todo: ${error.message}`,
        });
      },
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={editedStatus === Status.UPDATED}
        onCheckedChange={(checked) =>
          setEditedStatus(checked ? Status.UPDATED : Status.CREATED)
        }
        disabled={isUpdating || isDeleting}
      />
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
      {isEditing ? (
        <Button
          onClick={handleUpdate}
          disabled={isUpdating || isDeleting}
          size="sm"
        >
          {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      ) : (
        <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
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
  );
}
