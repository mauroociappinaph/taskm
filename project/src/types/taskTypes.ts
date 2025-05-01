export interface Task {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
  loading: boolean;
  error: string | null;
}
