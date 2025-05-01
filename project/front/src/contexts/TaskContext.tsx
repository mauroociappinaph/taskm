import React, { createContext, useState, useEffect, useCallback } from "react";
import toast from 'react-hot-toast';
import { TaskContextType } from "../types";
import { useAuth } from "../hooks";
import { getAllTasks, createTask, updateTask, deleteTask as apiDeleteTask } from "../api/tasks";
import { ApiTask } from "../types";

/**
 * Función adaptadora para convertir las tareas del formato de la API al formato interno
 * usado por el frontend.
 *
 * @param {ApiTask} apiTask - Tarea en formato de API (con _id, title, etc.)
 * @returns {Task} Tarea adaptada al formato del frontend (con id, text, etc.)
 */
const adaptTask = (apiTask: ApiTask) => ({
  id: apiTask._id,
  text: apiTask.title,
  completed: apiTask.completed,
  userId: apiTask.userId,
  createdAt: new Date(apiTask.createdAt)
});

/**
 * Contexto para la gestión completa de tareas en la aplicación.
 * Proporciona acceso al estado de tareas y métodos para manipularlas.
 */
const TaskContext = createContext<TaskContextType | undefined>(undefined);

/**
 * Proveedor del contexto de tareas que maneja el estado de las tareas y las operaciones CRUD.
 *
 * Funcionalidades:
 * - Carga de tareas desde la API
 * - Creación, actualización, eliminación y cambio de estado de tareas
 * - Ordenamiento automático (tareas completadas al final)
 * - Reordenamiento manual mediante drag and drop
 * - Gestión de estados de carga y errores
 *
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 */
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<TaskContextType["tasks"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Función para ordenar tareas con las completadas al final.
   * Mantiene el orden relativo entre tareas del mismo estado.
   *
   * @param {Task[]} taskList - Lista de tareas a ordenar
   * @returns {Task[]} Lista ordenada con tareas incompletas primero
   */
  const sortTasks = useCallback((taskList: TaskContextType["tasks"]) => {
    return [...taskList].sort((a, b) => {
      // Si una tarea está completada y la otra no, la completada va después
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      // Si ambas tienen el mismo estado, mantener el orden existente
      return 0;
    });
  }, []);

  /**
   * Carga todas las tareas del usuario actual desde la API.
   * Actualiza el estado con las tareas ordenadas y maneja errores.
   */
  const loadTasks = useCallback(async () => {
    // No cargar tareas si el usuario no está autenticado
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
      // Ordenar las tareas para que las completadas vayan al final
      setTasks(sortTasks(adaptedTasks));
      setError(null);
    } catch (err) {
      console.error("Error al cargar tareas:", err);
      setError("No se pudieron cargar las tareas");
      toast.error("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, sortTasks]);

  /**
   * Efecto para cargar tareas cuando el usuario inicia sesión.
   * También limpia las tareas cuando el usuario cierra sesión.
   */
  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [isAuthenticated, loadTasks]);

  /**
   * Crea una nueva tarea con el texto especificado.
   *
   * @param {string} text - Texto de la tarea a crear
   * @returns {Promise<void>}
   */
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
      setTasks(prevTasks => sortTasks([...prevTasks, newTask]));
      toast.success('Tarea agregada correctamente');
    } catch (err) {
      console.error("Error al crear tarea:", err);
      toast.error('Error al crear la tarea');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Elimina una tarea específica por su ID.
   *
   * @param {string} id - ID de la tarea a eliminar
   * @returns {Promise<void>}
   */
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

  /**
   * Cambia el estado de completado de una tarea.
   *
   * @param {string} id - ID de la tarea a alternar su estado
   * @returns {Promise<void>}
   */
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

      // Actualizar la tarea y reordenar la lista si es necesario
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task =>
          task.id === id ? updatedTask : task
        );
        return sortTasks(updatedTasks);
      });

      toast.success(updatedTask.completed ? 'Tarea completada!' : 'Tarea no completada');
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
      toast.error('Error al actualizar la tarea');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Edita el texto de una tarea existente.
   *
   * @param {string} id - ID de la tarea a editar
   * @param {string} text - Nuevo texto para la tarea
   * @returns {Promise<void>}
   */
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

  /**
   * Reordena las tareas mediante drag and drop.
   * Mueve una tarea desde su posición actual a una nueva posición.
   *
   * @param {number} startIndex - Índice original de la tarea
   * @param {number} endIndex - Índice de destino para la tarea
   */
  const reorderTasks = (startIndex: number, endIndex: number) => {
    setTasks(prevTasks => {
      const result = Array.from(prevTasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // Valor del contexto que se proporcionará a los consumidores
  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      deleteTask,
      toggleTask,
      editTask,
      loading,
      error,
      refreshTasks: loadTasks,
      reorderTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };
