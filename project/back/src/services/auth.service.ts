import { User } from '../models/user.model';
import { IUser } from '../types/index';
import jwt from 'jsonwebtoken';

export const register = async (
  userData: { email: string; password: string; name: string }
): Promise<{ user: IUser; token: string }> => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Usuario ya existe');
  }

  const user = new User(userData);
  await user.save();

  const token = generateToken(user._id);
  return { user, token };
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken(user._id);
  return { user, token };
};

const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};
