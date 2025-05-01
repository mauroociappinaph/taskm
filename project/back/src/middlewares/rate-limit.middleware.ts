import rateLimit from 'express-rate-limit';

/**
 * Middleware para limitar solicitudes por dirección IP hacia la API.
 * Proporciona protección contra ataques de denegación de servicio (DoS) y abuso de la API.
 *
 * Configuración general para toda la API:
 * - Establece un límite de 100 solicitudes por IP en una ventana de 15 minutos
 * - Incluye headers estándar que informan al cliente sobre su uso y límites
 * - Retorna un mensaje descriptivo cuando se alcanza el límite
 *
 * @returns {Function} Middleware de Express para aplicar límites de tasa
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por ventana por IP
  standardHeaders: true, // Incluir headers estándar de rate-limit en las respuestas (RateLimit-*)
  legacyHeaders: false, // Deshabilitar los headers X-RateLimit-* (obsoletos)
  message: { message: 'Demasiadas solicitudes, por favor intente más tarde' },
  skipSuccessfulRequests: false, // No saltarse solicitudes exitosas (todas cuentan para el límite)
});

/**
 * Middleware para limitar intentos de autenticación.
 * Proporciona protección contra ataques de fuerza bruta en las rutas de login y registro.
 *
 * Configuración más estricta específica para rutas de autenticación:
 * - Establece un límite de 10 intentos por IP en una ventana de 1 hora
 * - Aplica el límite incluso a solicitudes exitosas para prevenir enumeración de usuarios
 * - Retorna un mensaje específico para intentos de autenticación excesivos
 *
 * @returns {Function} Middleware de Express para aplicar límites de tasa en rutas de autenticación
 */
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Límite de 10 intentos por hora
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos de autenticación, por favor intente más tarde' },
  skipSuccessfulRequests: false, // Incluso los intentos exitosos cuentan para el límite
});
