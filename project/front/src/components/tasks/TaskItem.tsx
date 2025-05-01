import React, { useState } from "react";
import { Check, Trash2, Edit, GripVertical } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { TaskItemProps } from "../../types";


const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onConfirmDelete,
  dragHandleProps
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

  return (
    <>
      <div
        className={`group relative flex items-start gap-3 p-4 rounded-lg border transition-colors ${
          task.completed
            ? "bg-gray-50 border-gray-200"
            : "bg-white border-gray-200 hover:border-primary-500"
        }`}
      >
        <div className="flex items-center gap-3 flex-grow min-w-0">
          {dragHandleProps && (
            <button
              type="button"
              {...dragHandleProps}
              className="flex-shrink-0 cursor-grab active:cursor-grabbing p-1 -m-1 text-gray-400 hover:text-gray-600 touch-none focus:outline-none"
            >
              <GripVertical className="w-5 h-5" />
            </button>
          )}

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
            <p
              className={`text-sm truncate ${
                task.completed ? "text-gray-600 line-through" : "text-gray-800"
              }`}
            >
              {task.text}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
      </div>

      <Modal
        isOpen={isEditing}
        onClose={handleCancelEdit}
        title="Editar tarea"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Guardar
            </Button>
          </div>
        }
      >
        <div>
          <label htmlFor="taskText" className="block text-sm font-medium text-gray-700 mb-1">
            Texto de la tarea
          </label>
          <input
            id="taskText"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Escribe la tarea aquí"
          />
        </div>
      </Modal>
    </>
  );
};

export default TaskItem;
