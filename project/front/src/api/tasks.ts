import { get, post, put, del } from './client';
import { TaskInput, ApiTask } from '../types';

// Obtener todas las tareas
export const getAllTasks = async (): Promise<ApiTask[]> => {
  return await get<ApiTask[]>('/tasks');
};

// Obtener una tarea por ID
export const getTaskById = async (id: string): Promise<ApiTask> => {
  return await get<ApiTask>(`/tasks/${id}`);
};

// Crear una nueva tarea
export const createTask = async (taskData: TaskInput): Promise<ApiTask> => {
  return await post<ApiTask, TaskInput>('/tasks', taskData);
};

// Actualizar una tarea existente
export const updateTask = async (id: string, taskData: Partial<TaskInput>): Promise<ApiTask> => {
  return await put<ApiTask, Partial<TaskInput>>(`/tasks/${id}`, taskData);
};

// Eliminar una tarea
export const deleteTask = async (id: string): Promise<{ message: string }> => {
  return await del<{ message: string }>(`/tasks/${id}`);
};
