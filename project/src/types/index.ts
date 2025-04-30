export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
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