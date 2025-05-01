import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', taskController.getTasksAllController);
router.post('/', taskController.createTaskController);
router.put('/:id', taskController.updateTaskController);
router.delete('/:id', taskController.deleteTaskController);
router.get('/:id', taskController.getTaskByIdController);

export default router;
