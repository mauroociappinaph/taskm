// URL base para todas las solicitudes a la API
export const API_URL = 'http://localhost:3000/api';

// Función para manejar errores de la API
export const handleApiError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error &&
      error.response && typeof error.response === 'object' && 'data' in error.response &&
      error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data &&
      typeof error.response.data.message === 'string') {
    return error.response.data.message;
  }
  return error instanceof Error ? error.message : 'Error desconocido';
};

// Obtener el token de autenticación del almacenamiento local
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Guardar el token de autenticación en el almacenamiento local
export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Eliminar el token de autenticación del almacenamiento local
export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
};
