import { Task, ITask } from '../models/task.model';

export const getTasksAllService = async (userId: string): Promise<ITask[]> => {
  return Task.find({ userId });
};

export const createTaskService = async (taskData: Partial<ITask>, userId: string): Promise<ITask> => {
  const task = new Task({
    ...taskData,
    userId
  });
  return task.save();
};

export const updateTaskService = async (
  taskId: string,
  userId: string,
  updateData: Partial<ITask>
): Promise<ITask | null> => {
  return Task.findOneAndUpdate(
    { _id: taskId, userId },
    updateData,
    { new: true }
  );
};

export const deleteTaskService = async (taskId: string, userId: string): Promise<ITask | null> => {
  return Task.findOneAndDelete({ _id: taskId, userId });
};


export const getTaskByIdService = async (taskId: string, userId: string): Promise<ITask | null> => {
  return Task.findOne({ _id: taskId, userId });
};
