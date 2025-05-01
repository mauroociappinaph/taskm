import React, { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";
import { useTasks } from "../../hooks/useTasks";
import { taskSchema, validateField } from "../../validations/schemas";
import { ValidationError } from "yup";

const TaskForm: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const [error, setError] = useState<string | undefined>();
  const { addTask } = useTasks();

  const handleTaskTextChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaskText(value);
    const fieldError = await validateField(taskSchema, 'text', value);
    setError(fieldError || undefined);
  };

  const validateForm = async () => {
    try {
      await taskSchema.validate({ text: taskText }, { abortEarly: false });
      setError(undefined);
      return true;
    } catch (err) {
      if (err instanceof ValidationError && err.inner.length > 0) {
        setError(err.inner[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    addTask(taskText);
    setTaskText("");
    setError(undefined);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-2 mb-6"
    >
      <div className="flex items-center space-x-2">
        <div className="flex-grow">
          <input
            type="text"
            value={taskText}
            onChange={handleTaskTextChange}
            placeholder="Agregar una nueva tarea..."
            className={`w-full p-2 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-md focus:outline-none focus:ring-2 focus:border-transparent`}
            required
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        <Button type="submit" disabled={!taskText.trim() || !!error}>
          <Plus size={20} className="mr-1" /> Agregar
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
