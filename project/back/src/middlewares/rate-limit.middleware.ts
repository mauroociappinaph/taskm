import rateLimit from 'express-rate-limit';

// Middleware para limitar solicitudes por dirección IP
// Configuración general para la API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por ventana por IP
  standardHeaders: true, // Incluir headers estándar de rate-limit en las respuestas
  legacyHeaders: false, // Deshabilitar los headers X-RateLimit
  message: { message: 'Demasiadas solicitudes, por favor intente más tarde' },
  skipSuccessfulRequests: false, // No saltarse solicitudes exitosas
});

// Configuración más estricta para rutas de autenticación para prevenir ataques de fuerza bruta
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Límite de 10 intentos por hora
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos de autenticación, por favor intente más tarde' },
  skipSuccessfulRequests: false, // Incluso los intentos exitosos cuentan para el límite
});
