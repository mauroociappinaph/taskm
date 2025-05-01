import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "./TaskItem";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ClipboardList } from "lucide-react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";

const TaskList: React.FC = () => {
  const { tasks, deleteTask, toggleTask, editTask, loading, reorderTasks } = useTasks();
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
    // Si no hay destino válido o no se movió, no hacer nada
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    // Reordenar las tareas
    reorderTasks(result.source.index, result.destination.index);
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
              className="flex flex-col gap-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={deleteTask}
                        onToggle={toggleTask}
                        onEdit={editTask}
                        onConfirmDelete={handleConfirmDelete}
                        dragHandleProps={provided.dragHandleProps ?? undefined}
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
