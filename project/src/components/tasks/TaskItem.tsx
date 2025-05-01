import React, { useState } from "react";
import { Check, Trash2, Edit, X, GripVertical } from "lucide-react";
import Button from "../ui/Button";
import { Task } from "../../types";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onConfirmDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onConfirmDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== "") {
      onEdit(task.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div
      className={`group relative flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ${
        task.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-200 hover:border-primary-500 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3 flex-grow cursor-grab active:cursor-grabbing">
        <GripVertical className="flex-shrink-0 w-5 h-5 text-gray-400" />
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-primary-500"
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <Check size={14} />}
        </button>

        <div className="flex-grow min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-grow p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="flex gap-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveEdit}
                  aria-label="Save"
                >
                  <Check size={16} />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCancelEdit}
                  aria-label="Cancel"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          ) : (
            <p
              className={`text-sm truncate ${
                task.completed ? "text-gray-600 line-through" : "text-gray-800"
              }`}
            >
              {task.text}
            </p>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-gray-600 hover:text-primary-500 p-1"
            aria-label="Edit task"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onConfirmDelete(task.id)}
            className="text-gray-600 hover:text-red-500 p-1"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
