import React, { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button";
import { useTasks } from "../../contexts/TaskContext";

const TaskForm: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center space-x-2 mb-6"
    >
      <div className="flex-grow">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <Button type="submit" disabled={!taskText.trim()}>
        <Plus size={20} className="mr-1" /> Add
      </Button>
    </form>
  );
};

export default TaskForm;