import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * Middleware para registrar las solicitudes HTTP.
 * Captura información detallada sobre cada solicitud y respuesta.
 *
 * Registra:
 * - Método HTTP y URL
 * - Dirección IP del cliente
 * - Tiempo de respuesta
 * - Código de estado HTTP
 * - Datos enviados (en desarrollo)
 *
 * @param {Request} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 * @param {NextFunction} next - Función para pasar al siguiente middleware
 */
export const httpLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, url, ip } = req;

  // Registrar el comienzo de la solicitud
  logger.info(`Solicitud recibida: ${method} ${url} desde ${ip}`);

  // En modo desarrollo, registrar también los datos enviados
  if (process.env.NODE_ENV !== 'production' && req.body && Object.keys(req.body).length) {
    logger.debug(`Datos recibidos: ${JSON.stringify(req.body)}`);
  }

  // Cuando la respuesta finaliza
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    // Determinar el nivel de log según el código de estado
    if (statusCode >= 500) {
      logger.error(`${method} ${url} - ${statusCode} - ${duration}ms`);
    } else if (statusCode >= 400) {
      logger.warn(`${method} ${url} - ${statusCode} - ${duration}ms`);
    } else {
      logger.info(`${method} ${url} - ${statusCode} - ${duration}ms`);
    }
  });

  // Pasar al siguiente middleware
  next();
};

/**
 * Middleware para registrar y formatear errores.
 * Captura errores que ocurren en la aplicación.
 *
 * @param {Error} err - El error capturado
 * @param {Request} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 * @param {NextFunction} next - Función para pasar al siguiente middleware
 */
export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const { method, url, ip } = req;

  // Registrar el error con detalles adicionales
  logger.error(`Error en ${method} ${url} desde ${ip}: ${err.message}`, {
    stack: err.stack,
    url,
    method,
    ip
  });

  // Pasar al siguiente middleware de manejo de errores
  next(err);
};
