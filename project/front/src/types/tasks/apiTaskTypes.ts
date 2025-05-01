/**
 * Interface representing a task as received from the API
 * @interface ApiTask
 */
export interface ApiTask {
  _id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
