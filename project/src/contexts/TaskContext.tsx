import React, { createContext, useState, useContext, useEffect } from "react";
import toast from 'react-hot-toast';
import { Task, TaskContextType } from "../types";
import { useAuth } from "./AuthContext";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const loadTasks = () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const storedTasks = localStorage.getItem(`taskmate-tasks-${user?.id}`);
      if (storedTasks) {
        // Parse the tasks and convert string dates back to Date objects
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
        setTasks(parsedTasks);
      } else {
        // Sample tasks for new users
        const sampleTasks: Task[] = [
          {
            id: "1",
            text: "Welcome to TaskMate! Click to mark as complete",
            completed: false,
            userId: user?.id || "",
            createdAt: new Date()
          },
          {
            id: "2",
            text: "Use the form above to add new tasks",
            completed: false,
            userId: user?.id || "",
            createdAt: new Date()
          }
        ];
        setTasks(sampleTasks);
        saveTasks(sampleTasks);
      }
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = (updatedTasks: Task[]) => {
    if (user) {
      localStorage.setItem(`taskmate-tasks-${user.id}`, JSON.stringify(updatedTasks));
    }
  };

  const addTask = (text: string) => {
    if (!text.trim() || !user) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      userId: user.id,
      createdAt: new Date()
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast.success('Task added successfully');
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast.success('Task deleted successfully');
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const completed = !task.completed;
        toast.success(completed ? 'Task completed!' : 'Task uncompleted');
        return { ...task, completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (id: string, text: string) => {
    if (!text.trim()) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, text } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast.success('Task updated successfully');
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    setTasks(result);
    saveTasks(result);
    toast.success('Task reordered successfully');
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      deleteTask,
      toggleTask,
      editTask,
      reorderTasks,
      loading,
      error
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};