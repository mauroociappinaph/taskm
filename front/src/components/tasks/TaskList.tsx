import React, { useState } from "react";
import { useTasks } from "../../contexts/TaskContext";
import TaskItem from "./TaskItem";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ClipboardList } from "lucide-react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

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

  const handleDragEnd = (result: DropResult) => {
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ClipboardList className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-800 mb-2">No hay tareas</h3>
        <p className="text-gray-600 max-w-md">
          Agrega tu primera tarea usando el formulario arriba para empezar
        </p>
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-2"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(dragProvided, snapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className={`${
                        snapshot.isDragging
                          ? "shadow-lg bg-white rounded-lg ring-2 ring-primary-500 ring-opacity-50 z-50"
                          : ""
                      }`}
                    >
                      <TaskItem
                        task={task}
                        onDelete={deleteTask}
                        onToggle={toggleTask}
                        onEdit={editTask}
                        onConfirmDelete={handleConfirmDelete}
                        dragHandleProps={dragProvided.dragHandleProps ?? undefined}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      <Modal
        isOpen={taskToDelete !== null}
        onClose={closeDeleteModal}
        title="Confirmar eliminación"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteTask}>
              Eliminar
            </Button>
          </div>
        }
      >
        <p>¿Estás seguro de querer eliminar esta tarea? Esta acción no se puede deshacer.</p>
      </Modal>
    </>
  );
};

export default TaskList;
