import React, { useState } from "react";
import { useTasks } from "../../contexts/TaskContext";
import TaskItem from "./TaskItem";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ClipboardList } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList: React.FC = () => {
  const { tasks, deleteTask, toggleTask, editTask, reorderTasks, loading } = useTasks();
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleConfirmDelete = (id: string) => {
    setTaskToDelete(id);
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex !== destinationIndex) {
      reorderTasks(sourceIndex, destinationIndex);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ClipboardList className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No tasks yet</h3>
        <p className="text-gray-500 max-w-md">
          Add your first task using the form above to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-1 animate-fadeIn"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-shadow ${
                        snapshot.isDragging ? "shadow-lg" : ""
                      }`}
                    >
                      <TaskItem
                        task={task}
                        onDelete={deleteTask}
                        onToggle={toggleTask}
                        onEdit={editTask}
                        onConfirmDelete={handleConfirmDelete}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Modal
        isOpen={taskToDelete !== null}
        onClose={closeDeleteModal}
        title="Confirm Deletion"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteTask}>
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete this task? This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default TaskList;