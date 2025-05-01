import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasksAllService(req.user._id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTaskService(req.body, req.user._id);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la tarea' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTaskService(req.params.id, req.user._id, req.body);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la tarea' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.deleteTaskService(req.params.id, req.user._id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la tarea' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskByIdService(req.params.id, req.user._id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener la tarea' });
  }
};



