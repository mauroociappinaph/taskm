import rateLimit from 'express-rate-limit';

/**
 * Middleware to limit the number of requests a client (by IP) can make
 * to the general API within a given time window.
 *
 * Limits each IP to 100 requests per 15 minutes.
 * Helps prevent abuse and protects against denial-of-service (DoS) attacks.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { message: 'Too many requests, please try again later.' },
  skipSuccessfulRequests: false, // Count all requests, including successful ones
});

/**
 * Middleware with stricter limits for authentication routes.
 *
 * Limits each IP to 10 login attempts per hour.
 * Helps reduce the risk of brute-force attacks against authentication endpoints.
 */
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts, please try again later.' },
  skipSuccessfulRequests: false, // Count all attempts, even successful ones
});
