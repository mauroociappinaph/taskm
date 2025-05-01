import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/index';

const { getTasksAllController, createTaskController, updateTaskController, deleteTaskController, getTaskByIdController } = taskController;

const router = Router();

router.get('/', authMiddleware, getTasksAllController)
.post('/', authMiddleware, createTaskController)
.put('/:id', authMiddleware, updateTaskController)
.delete('/:id', authMiddleware, deleteTaskController)
.get('/:id', authMiddleware, getTaskByIdController)

export default router;
