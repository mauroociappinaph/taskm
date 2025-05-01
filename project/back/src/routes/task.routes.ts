import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, taskController.getTasksAllController)
.post('/', authMiddleware, taskController.createTaskController)
.put('/:id', authMiddleware, taskController.updateTaskController)
.delete('/:id', authMiddleware, taskController.deleteTaskController)
.get('/:id', authMiddleware, taskController.getTaskByIdController)

export default router;
