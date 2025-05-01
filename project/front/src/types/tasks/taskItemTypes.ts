import { Task } from "./taskTypes";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

/**
 * Interface representing the properties of a task item component
 * @interface TaskItemProps
 * @property {Task} task - The task object to display
 * @property {Function} onDelete - Callback function when task is deleted
 * @property {Function} onToggle - Callback function when task completion status is toggled
 * @property {Function} onEdit - Callback function when task is edited
 */
export interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onConfirmDelete: (id: string) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}
