import axios from 'axios';
import { API_URL, getAuthToken } from './config';

// Crear una instancia de axios con la URL base
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log para confirmar la configuración inicial
console.log('API Client configurado con URL base:', API_URL);

// Interceptor para agregar el token de autenticación a las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token añadido a la solicitud:', config.url);
  } else {
    console.log('Solicitud sin token de autenticación:', config.url);
  }
  return config;
});

// Interceptor para respuestas
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Respuesta exitosa de ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error(`Error en solicitud a ${error.config?.url || 'desconocido'}:`,
      error.response?.status || error.message);
    return Promise.reject(error);
  }
);

// Funciones de ayuda para realizar solicitudes HTTP
export const get = async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
  console.log(`GET ${url} iniciado con params:`, params);
  try {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error en GET ${url}:`, error);
    throw error;
  }
};

export const post = async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
  console.log(`POST ${url} iniciado con data:`, data);
  try {
    const response = await apiClient.post<T>(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error en POST ${url}:`, error);
    throw error;
  }
};

export const put = async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
  console.log(`PUT ${url} iniciado con data:`, data);
  try {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error en PUT ${url}:`, error);
    throw error;
  }
};

export const del = async <T>(url: string): Promise<T> => {
  console.log(`DELETE ${url} iniciado`);
  try {
    const response = await apiClient.delete<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error en DELETE ${url}:`, error);
    throw error;
  }
};
