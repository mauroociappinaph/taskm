import React, { useState } from "react";
import { Check, Trash2, Edit, GripVertical } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { TaskItemProps } from "../../types";
import { motion, AnimatePresence } from "framer-motion";

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onConfirmDelete,
  dragHandleProps,
  isDragging
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
      <motion.div
        initial={false}
        animate={{
          backgroundColor: task.completed ? "rgb(249, 250, 251)" : "rgb(255, 255, 255)",
          borderColor: task.completed ? "rgb(229, 231, 235)" : "rgb(229, 231, 235)",
          scale: isDragging ? 1.02 : 1,
          boxShadow: isDragging
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            : "0 0 0 0 rgba(0, 0, 0, 0)",
          zIndex: isDragging ? 10 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.35
        }}
        className="group relative flex items-start gap-3 p-4 rounded-lg border"
      >
        <div className="flex items-center gap-3 flex-grow min-w-0">
          {dragHandleProps && (
            <button
              type="button"
              {...dragHandleProps}
              className="flex-shrink-0 cursor-grab active:cursor-grabbing p-1 -m-1 text-gray-400 hover:text-gray-600 touch-none focus:outline-none"
              aria-label="Drag handle"
            >
              <GripVertical className="w-5 h-5" />
            </button>
          )}

          <motion.button
            initial={false}
            animate={{
              backgroundColor: task.completed ? "rgb(34, 197, 94)" : "transparent",
              borderColor: task.completed ? "rgb(34, 197, 94)" : "rgb(209, 213, 219)"
            }}
            whileTap={{ scale: 0.85 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            onClick={() => onToggle(task.id)}
            className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center text-white`}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {task.completed && (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 0.25
                  }}
                >
                  <Check size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="flex-grow min-w-0">
            <motion.p
              initial={false}
              animate={{
                color: task.completed ? "rgb(107, 114, 128)" : "rgb(31, 41, 55)",
                textDecoration: task.completed ? "line-through" : "none"
              }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.35
              }}
              className="text-sm"
            >
              {task.text}
            </motion.p>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      </motion.div>

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
