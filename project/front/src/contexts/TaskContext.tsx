import React, { createContext, useState, useEffect, useCallback } from "react";
import toast from 'react-hot-toast';
import { TaskContextType } from "../types";
import { useAuth } from "./AuthContext";
import { getAllTasks, createTask, updateTask, deleteTask as apiDeleteTask } from "../api/tasks";
import { ApiTask } from "../types";

// Adaptador para convertir la tarea de la API al formato esperado por el frontend
const adaptTask = (apiTask: ApiTask) => ({
  id: apiTask._id,
  text: apiTask.title,
  completed: apiTask.completed,
  userId: apiTask.userId,
  createdAt: new Date(apiTask.createdAt)
});

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<TaskContextType["tasks"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar tareas desde la API
  const loadTasks = useCallback(async () => {
    if (!isAuthenticated) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log("Cargando tareas desde la API...");
      const apiTasks = await getAllTasks();
      console.log("Tareas recibidas:", apiTasks);

      // Convertir las tareas de la API al formato esperado por el frontend
      const adaptedTasks = apiTasks.map(adaptTask);
      setTasks(adaptedTasks);
      setError(null);
    } catch (err) {
      console.error("Error al cargar tareas:", err);
      setError("No se pudieron cargar las tareas");
      toast.error("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Cargar tareas cuando el usuario inicia sesión
  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [isAuthenticated, loadTasks]);


  const addTask = async (text: string) => {
    if (!text.trim() || !isAuthenticated) return;

    try {
      setLoading(true);
      const apiTask = await createTask({
        title: text,
        completed: false
      });

      // Convertir la tarea de la API al formato esperado por el frontend
      const newTask = adaptTask(apiTask);
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast.success('Tarea agregada correctamente');
    } catch (err) {
      console.error("Error al crear tarea:", err);
      toast.error('Error al crear la tarea');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      // La API espera el ID real de la base de datos
      await apiDeleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      toast.success('Tarea eliminada correctamente');
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
      toast.error('Error al eliminar la tarea');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;

      setLoading(true);
      // La API espera el formato de la API
      const apiTask = await updateTask(id, {
        title: taskToUpdate.text,
        completed: !taskToUpdate.completed
      });

      // Convertir la tarea actualizada al formato del frontend
      const updatedTask = adaptTask(apiTask);
      setTasks(prevTasks =>
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );

      toast.success(updatedTask.completed ? 'Tarea completada!' : 'Tarea no completada');
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
      toast.error('Error al actualizar la tarea');
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id: string, text: string) => {
    if (!text.trim()) return;

    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;

      setLoading(true);
      // La API espera el formato de la API
      const apiTask = await updateTask(id, {
        title: text,
        completed: taskToUpdate.completed
      });

      // Convertir la tarea actualizada al formato del frontend
      const updatedTask = adaptTask(apiTask);
      setTasks(prevTasks =>
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );

      toast.success('Tarea actualizada correctamente');
    } catch (err) {
      console.error("Error al editar tarea:", err);
      toast.error('Error al actualizar la tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      deleteTask,
      toggleTask,
      editTask,
      loading,
      error,
      refreshTasks: loadTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };
