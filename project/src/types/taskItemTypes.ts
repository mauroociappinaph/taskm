import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Task } from "./taskTypes";

export interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onConfirmDelete: (id: string) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}
