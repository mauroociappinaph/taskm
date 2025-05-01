import { LoginFormProps } from "./loginTypes";
import { RegisterFormProps } from "./registerTypes";
import { Task } from "./taskTypes";
import { TaskContextType } from "./taskTypes";
import { TaskItemProps } from "./taskTypes";

export type { LoginFormProps, RegisterFormProps, Task, TaskContextType, TaskItemProps };



export interface User {
  id: string;
  email: string;
  name: string;
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

