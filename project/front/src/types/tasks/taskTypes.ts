import { BaseEntity, WithLoadingState } from "../commonTypes";

/**
 * Interface representing a task in the application
 * @interface Task
 * @extends BaseEntity
 */
export interface Task extends BaseEntity {
  text: string;
  completed: boolean;
  userId: string;

}

/**
 * Interface representing the task context state and methods
 * @interface TaskContextType
 * @extends WithLoadingState
 */
export interface TaskContextType extends WithLoadingState {
  tasks: Task[];
  addTask: (text: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  editTask: (id: string, text: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
}
