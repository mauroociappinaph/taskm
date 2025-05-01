// Eliminada la definición redundante de ITask, ahora se encuentra en models/task.model.ts

export interface CreateTaskDTO {
  title: string;
  description: string;
  completed?: boolean;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}
