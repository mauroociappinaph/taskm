import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authLimiter } from '../middlewares/rate-limit.middleware';

const router = Router();
const authController = new AuthController();

// Aplicar rate limiter específico para rutas de autenticación
router.use(authLimiter);

router
.post('/register', authController.register)
.post('/login', authController.login);

export default router;
