// Eliminada la definición redundante de ITask, ahora se encuentra en models/task.model.ts

export interface CreateTaskDTO {
  title: string;
  completed?: boolean;
}

export interface UpdateTaskDTO {
  title?: string;
  completed?: boolean;
}
