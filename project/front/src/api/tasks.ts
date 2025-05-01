import { get, post, put, del } from './client';

// Tipo para las tareas
export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Tipo para crear o actualizar tareas
export interface TaskInput {
  title: string;
  description: string;
  completed: boolean;
}

// Obtener todas las tareas
export const getAllTasks = async (): Promise<Task[]> => {
  return await get<Task[]>('/tasks');
};

// Obtener una tarea por ID
export const getTaskById = async (id: string): Promise<Task> => {
  return await get<Task>(`/tasks/${id}`);
};

// Crear una nueva tarea
export const createTask = async (taskData: TaskInput): Promise<Task> => {
  return await post<Task, TaskInput>('/tasks', taskData);
};

// Actualizar una tarea existente
export const updateTask = async (id: string, taskData: Partial<TaskInput>): Promise<Task> => {
  return await put<Task, Partial<TaskInput>>(`/tasks/${id}`, taskData);
};

// Eliminar una tarea
export const deleteTask = async (id: string): Promise<{ message: string }> => {
  return await del<{ message: string }>(`/tasks/${id}`);
};
