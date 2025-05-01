// Configuración de la API
export * from './config';

// Cliente HTTP
export * from './client';

// Módulos de funcionalidad
export * from './auth';
export * from './tasks';

// Para mantener compatible con importaciones en módulos existentes
import * as authAPI from './auth';
import * as tasksAPI from './tasks';

export const api = {
  auth: authAPI,
  tasks: tasksAPI,
};
