import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import { AuthRequest } from '../types';
import { Types } from 'mongoose';

export const getTasksAllController = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();
    const tasks = await taskService.getTasksAllService(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();
    const task = await taskService.createTaskService(req.body, userId);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la tarea' });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();
    const task = await taskService.updateTaskService(
      req.params.id,
      userId,
      req.body
    );
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la tarea' });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();
    const task = await taskService.deleteTaskService(req.params.id, userId);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la tarea' });
  }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();
    const task = await taskService.getTaskByIdService(req.params.id, userId);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener la tarea' });
  }
};





