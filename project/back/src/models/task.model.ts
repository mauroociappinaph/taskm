import { Schema, model } from 'mongoose';
import { ITask } from '../types/task/task.model.type';




const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Task = model<ITask>('Task', taskSchema);
