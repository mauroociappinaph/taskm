import app from './app';
import { connectDB } from './config/database';
import logger from './utils/logger';

const PORT = process.env.PORT || 3001;

// Configuración básica de información del servidor
const serverInfo = {
  nodeVersion: process.version,
  platform: process.platform,
  environment: process.env.NODE_ENV || 'development',
  port: PORT
};

// Registrar información de inicio del servidor
logger.info('Iniciando servidor TaskMate API', { serverInfo });

// Conectar a la base de datos y luego iniciar el servidor
logger.info('Conectando a la base de datos MongoDB...');
connectDB()
  .then(() => {
    logger.info('Conexión a la base de datos establecida correctamente');

    // Iniciar el servidor HTTP
    app.listen(PORT, () => {
      logger.info(`Servidor TaskMate API ejecutándose en puerto ${PORT}`);
      logger.info(`Modo: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    logger.error('Error al conectar con la base de datos', { error });
    process.exit(1);
  });

// Manejo de señales de sistema
process.on('SIGTERM', () => {
  logger.info('Señal SIGTERM recibida. Apagando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Señal SIGINT recibida. Apagando servidor...');
  process.exit(0);
});
