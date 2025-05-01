import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      logger.info(`Intento de registro para usuario: ${email}`);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        logger.warn(`Intento de registro con email ya existente: ${email}`);
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const user = new User({ email, password, name });
      await user.save();

      logger.info(`Usuario registrado exitosamente: ${email}`);

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.status(201).json({ token });
    } catch (error) {
      logger.error('Error en el registro de usuario', { error, email: req.body?.email });
      res.status(400).json({ message: 'Error en el registro' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      logger.info(`Intento de inicio de sesión para: ${email}`);

      const user = await User.findOne({ email });
      if (!user) {
        logger.warn(`Intento de inicio de sesión con email no registrado: ${email}`);
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        logger.warn(`Contraseña incorrecta para usuario: ${email}`);
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      logger.info(`Inicio de sesión exitoso para: ${email}`);

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({ token });
    } catch (error) {
      logger.error('Error en el inicio de sesión', { error, email: req.body?.email });
      res.status(400).json({ message: 'Error en el inicio de sesión' });
    }
  }
}
