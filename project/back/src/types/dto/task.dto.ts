export interface CreateTaskDTO {
  title: string;
  completed?: boolean;
}

export interface UpdateTaskDTO {
  title?: string;
  completed?: boolean;
}
