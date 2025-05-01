import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', taskController.getTasksAllController)
.post('/', taskController.createTaskController)
.put('/:id', taskController.updateTaskController)
.delete('/:id', taskController.deleteTaskController)
.get('/:id', taskController.getTaskByIdController)

export default router;
