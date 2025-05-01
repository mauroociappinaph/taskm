import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Asegurarse de que el directorio de logs existe
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Definir formato personalizado para los logs
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack ? '\n' + stack : ''}`;
  })
);

// Crear la instancia del logger con configuración personalizada
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: customFormat,
  defaultMeta: { service: 'taskmate-api' },
  transports: [
    // Siempre escribir logs de error a un archivo específico
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Escribir todos los logs a otro archivo
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
  ],
  exceptionHandlers: [
    // Capturar excepciones no manejadas
    new winston.transports.File({
      filename: path.join(logDir, 'exceptions.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ],
  rejectionHandlers: [
    // Capturar promesas rechazadas no manejadas
    new winston.transports.File({
      filename: path.join(logDir, 'rejections.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

// En desarrollo, mostrar también logs en consola
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      customFormat
    ),
  }));
}

/**
 * Logger personalizado para la aplicación TaskMate.
 *
 * Características:
 * - Diferentes niveles de log (error, warn, info, debug)
 * - Logs específicos para errores y excepciones
 * - Rotación de archivos de log
 * - Formatos personalizados con timestamps
 * - Logs en consola solo en entorno de desarrollo
 */
export default logger;
