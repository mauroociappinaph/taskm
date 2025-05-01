import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes, taskRoutes } from './routes/index.route';
import { apiLimiter, httpLogger, errorLogger } from './middlewares';
import logger from './utils/logger';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware básicos
app.use(cors());
app.use(express.json());

// Middleware de logging para HTTP
app.use(httpLogger);

// Aplicar el rate limiter a todas las solicitudes
app.use(apiLimiter);

// Rutas de la API
app
  .use('/api/tasks', taskRoutes)
  .use('/api/auth', authRoutes);

// Ruta básica para verificar que la API está funcionando
app.get('/', (_req: Request, res: Response) => {
  logger.info('Verificación de estado de la API');
  res.send('API funcionando correctamente');
});

// Middleware para manejar rutas no encontradas
app.use((_req: Request, res: Response) => {
  logger.warn('Intento de acceso a ruta no existente');
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para capturar y registrar errores
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  // Usar el middleware de logging para registrar el error
  errorLogger(err, req, res, () => {});

  // Enviar respuesta de error al cliente
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

// Capturar excepciones no manejadas
process.on('uncaughtException', (error: Error) => {
  logger.error('Excepción no manejada', { error });
  // En producción, deberíamos reiniciar el proceso de manera ordenada
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

// Capturar promesas rechazadas no manejadas
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Promesa rechazada no manejada', { reason });
});

export default app;
