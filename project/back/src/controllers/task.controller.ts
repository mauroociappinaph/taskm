import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import { AuthRequest } from '../types';
import { Types } from 'mongoose';
import logger from '../utils/logger';

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

    logger.info(`Obtención de tareas para el usuario ID: ${userId}`);

    // Llama al servicio para obtener tareas filtradas por usuario
    const tasks = await taskService.getTasksAllService(userId);

    logger.debug(`Tareas recuperadas: ${tasks.length}`);
    res.json(tasks);
  } catch (error) {
    logger.error('Error al obtener tareas', { error });
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

    logger.info(`Creación de nueva tarea para usuario ID: ${userId}`);
    logger.debug('Datos de la tarea a crear:', { taskData: req.body });

    // Crea la tarea asociándola al usuario actual
    const task = await taskService.createTaskService(req.body, userId);

    // Evitar el error de tipo accediendo a _id como propiedad dinámica
    const taskId = (task as any)._id?.toString();
    logger.info(`Tarea creada con ID: ${taskId}`);
    res.status(201).json(task);
  } catch (error) {
    logger.error('Error al crear tarea', { error, body: req.body });
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
    const taskId = req.params.id;

    logger.info(`Actualización de tarea ID: ${taskId} para usuario ID: ${userId}`);
    logger.debug('Datos para actualizar:', { taskData: req.body });

    // Actualiza la tarea verificando que pertenezca al usuario
    const task = await taskService.updateTaskService(
      taskId,
      userId,
      req.body
    );

    // Si no se encuentra la tarea o no pertenece al usuario
    if (!task) {
      logger.warn(`Intento de actualizar tarea no encontrada o no autorizada. TaskID: ${taskId}, UserID: ${userId}`);
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    logger.info(`Tarea ${taskId} actualizada correctamente`);
    res.json(task);
  } catch (error) {
    logger.error('Error al actualizar tarea', { error, taskId: req.params.id, body: req.body });
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
    const taskId = req.params.id;

    logger.info(`Eliminación de tarea ID: ${taskId} para usuario ID: ${userId}`);

    // Elimina la tarea verificando que pertenezca al usuario
    const task = await taskService.deleteTaskService(taskId, userId);

    // Si no se encuentra la tarea o no pertenece al usuario
    if (!task) {
      logger.warn(`Intento de eliminar tarea no encontrada o no autorizada. TaskID: ${taskId}, UserID: ${userId}`);
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    logger.info(`Tarea ${taskId} eliminada correctamente`);
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    logger.error('Error al eliminar tarea', { error, taskId: req.params.id });
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
    const taskId = req.params.id;

    logger.info(`Obtención de tarea ID: ${taskId} para usuario ID: ${userId}`);

    // Obtiene la tarea verificando que pertenezca al usuario
    const task = await taskService.getTaskByIdService(taskId, userId);

    // Si no se encuentra la tarea o no pertenece al usuario
    if (!task) {
      logger.warn(`Intento de acceder a tarea no encontrada o no autorizada. TaskID: ${taskId}, UserID: ${userId}`);
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    logger.info(`Tarea ${taskId} recuperada correctamente`);
    res.json(task);
  } catch (error) {
    logger.error('Error al obtener tarea por ID', { error, taskId: req.params.id });
    res.status(400).json({ message: 'Error al obtener la tarea' });
  }
};





