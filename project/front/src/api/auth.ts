import { post } from './client';
import { setAuthToken, removeAuthToken } from './config';
import { RegisterData, LoginData, AuthResponse } from '../types';


// Función para registrar un nuevo usuario
export const register = async (userData: RegisterData): Promise<void> => {
  const response = await post<AuthResponse, RegisterData>('/auth/register', userData);
  if (response.token) {
    setAuthToken(response.token);
  }
};

// Función para iniciar sesión
export const login = async (credentials: LoginData): Promise<void> => {
  const response = await post<AuthResponse, LoginData>('/auth/login', credentials);
  if (response.token) {
    setAuthToken(response.token);
  }
};

// Función para cerrar sesión
export const logout = (): void => {
  removeAuthToken();
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
