import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { JwtPayload } from '../types';
import { AuthRequest } from '../types/common/request.types';

/**
 * Middleware de autenticación basado en JWT.
 * Verifica que las solicitudes a rutas protegidas incluyan un token JWT válido.
 *
 * Proceso:
 * 1. Extrae el token del header Authorization
 * 2. Verifica la validez del token con la clave secreta
 * 3. Busca el usuario asociado en la base de datos
 * 4. Adjunta el usuario al objeto de solicitud para uso posterior
 *
 * Si cualquier paso falla, retorna un error 401 (No autorizado).
 *
 * @param {Request} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 * @param {NextFunction} next - Función para pasar al siguiente middleware
 * @returns {Promise<void>} No devuelve valor directamente, llama a next() o envía respuesta de error
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extrae el token del header Authorization (formato: "Bearer <token>")
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Verifica que exista un token
    if (!token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;

    // Busca el usuario asociado al token
    const user = await User.findById(decoded.userId);

    // Verifica que el usuario existe en la base de datos
    if (!user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Adjunta el usuario al objeto de solicitud para su uso en controladores posteriores
    (req as AuthRequest).user = user;
    next();
  } catch (error) {
    // Captura cualquier error (token inválido, expirado, etc.)
    res.status(401).json({ message: 'No autorizado' });
  }
};
