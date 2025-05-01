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
            text: "Bienvenido a TaskMate! Haz click para marcar como completado",
            completed: false,
            userId: user?.id || "",
            createdAt: new Date()
          },
          {
            id: "2",
            text: "Usa el formulario arriba para agregar nuevas tareas",
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
    toast.success('Tarea agregada correctamente');
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast.success('Tarea eliminada correctamente');
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const completed = !task.completed;
        toast.success(completed ? 'Tarea completada!' : 'Tarea no completada');
        return { ...task, completed };
      }
      return task;
    });

    // Reorder tasks: completed tasks go to the end
    const sortedTasks = [...updatedTasks].sort((a, b) => {
      if (a.completed === b.completed) {
        return 0;
      }
      return a.completed ? 1 : -1;
    });

    setTasks(sortedTasks);
    saveTasks(sortedTasks);
  };

  const editTask = (id: string, text: string) => {
    if (!text.trim()) return;

    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast.success('Tarea actualizada correctamente');
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setTasks(result);
    saveTasks(result);
    toast.success('Tareas reordenadas correctamente');
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
