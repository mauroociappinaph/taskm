import { Request, Response } from 'express';
import { Task, ITask } from '../models/task.model';

export class TaskController {
  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.find({ userId: req.user._id });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las tareas' });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const task = new Task({
        ...req.body,
        userId: req.user._id
      });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear la tarea' });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true }
      );
      if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la tarea' });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id
      });
      if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
      res.json({ message: 'Tarea eliminada' });
    } catch (error) {
      res.status(400).json({ message: 'Error al eliminar la tarea' });
    }
  }
}
