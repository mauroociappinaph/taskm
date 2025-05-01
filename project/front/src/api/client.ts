import axios from 'axios';
import { API_URL, getAuthToken } from './config';

// Crear una instancia de axios con la URL base
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación a las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funciones de ayuda para realizar solicitudes HTTP
export const get = async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
};

export const post = async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
  const response = await apiClient.post<T>(url, data);
  return response.data;
};

export const put = async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
  const response = await apiClient.put<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response = await apiClient.delete<T>(url);
  return response.data;
};
