import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import { AuthRequest } from '../types';
import { Types } from 'mongoose';

/**
 * Controlador para obtener todas las tareas del usuario autenticado.
 *
 * @param {Request} req - Objeto de solicitud Express (con usuario autenticado)
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} Respuesta JSON con array de tareas o mensaje de error
 */
export const getTasksAllController = async (req: Request, res: Response) => {
  try {
    // Extrae el ID del usuario autenticado
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();

    // Llama al servicio para obtener tareas filtradas por usuario
    const tasks = await taskService.getTasksAllService(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

/**
 * Controlador para crear una nueva tarea asociada al usuario autenticado.
 *
 * @param {Request} req - Objeto de solicitud Express con datos de la tarea en el body
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} Respuesta JSON con la tarea creada o mensaje de error
 */
export const createTaskController = async (req: Request, res: Response) => {
  try {
    // Extrae el ID del usuario autenticado
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();

    // Crea la tarea asociándola al usuario actual
    const task = await taskService.createTaskService(req.body, userId);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la tarea' });
  }
};

/**
 * Controlador para actualizar una tarea existente.
 * Verifica que la tarea pertenezca al usuario autenticado.
 *
 * @param {Request} req - Objeto de solicitud Express con ID de tarea en params y datos actualizados en body
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} Respuesta JSON con la tarea actualizada o mensaje de error
 */
export const updateTaskController = async (req: Request, res: Response) => {
  try {
    // Extrae el ID del usuario autenticado
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();

    // Actualiza la tarea verificando que pertenezca al usuario
    const task = await taskService.updateTaskService(
      req.params.id,
      userId,
      req.body
    );

    // Si no se encuentra la tarea o no pertenece al usuario
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la tarea' });
  }
};

/**
 * Controlador para eliminar una tarea existente.
 * Verifica que la tarea pertenezca al usuario autenticado.
 *
 * @param {Request} req - Objeto de solicitud Express con ID de tarea en params
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} Respuesta JSON con mensaje de confirmación o error
 */
export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    // Extrae el ID del usuario autenticado
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();

    // Elimina la tarea verificando que pertenezca al usuario
    const task = await taskService.deleteTaskService(req.params.id, userId);

    // Si no se encuentra la tarea o no pertenece al usuario
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la tarea' });
  }
};

/**
 * Controlador para obtener una tarea específica por su ID.
 * Verifica que la tarea pertenezca al usuario autenticado.
 *
 * @param {Request} req - Objeto de solicitud Express con ID de tarea en params
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} Respuesta JSON con la tarea solicitada o mensaje de error
 */
export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    // Extrae el ID del usuario autenticado
    const { _id } = (req as AuthRequest).user;
    const userId = (_id as Types.ObjectId).toString();

    // Obtiene la tarea verificando que pertenezca al usuario
    const task = await taskService.getTaskByIdService(req.params.id, userId);

    // Si no se encuentra la tarea o no pertenece al usuario
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener la tarea' });
  }
};





