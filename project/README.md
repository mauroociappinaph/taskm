# TaskMate - Aplicación de Gestión de Tareas

TaskMate es una aplicación web completa de gestión de tareas construida con el stack MERN (MongoDB, Express, React, Node.js) que permite a los usuarios gestionar sus tareas personales de manera eficiente y segura.

![TaskMate Preview](https://via.placeholder.com/800x400?text=TaskMate+Preview)

## Características

- **Autenticación segura** con JWT y persistencia de sesión
- **Operaciones CRUD** completas para gestión de tareas
- **Privacidad de datos**: cada usuario solo puede ver y modificar sus propias tareas
- **Drag & Drop** para reordenar tareas según prioridad
- **Ordenamiento automático** de tareas completadas
- **Validación de formularios** con feedback visual en tiempo real
- **Animaciones fluidas** para mejorar la experiencia de usuario
- **Diseño responsive** adaptado a dispositivos móviles y de escritorio
- **Confirmaciones modales** para acciones destructivas
- **Medidas de seguridad** avanzadas contra ataques comunes

## Tecnologías Utilizadas

### Frontend

- **React** con TypeScript para una base sólida y tipada
- **Tailwind CSS** para un diseño moderno y responsivo
- **Framer Motion** para animaciones fluidas y profesionales
- **React Beautiful DnD** para funcionalidad de arrastrar y soltar
- **Yup** para validación de formularios robusta y declarativa
- **React Hot Toast** para notificaciones elegantes y no intrusivas
- **Axios** para comunicación con la API

### Backend

- **Node.js y Express** para crear una API RESTful
- **MongoDB y Mongoose** para almacenamiento de datos
- **JWT (JSON Web Tokens)** para autenticación segura
- **Bcrypt** para el hash seguro de contraseñas
- **Express Rate Limit** para protección contra ataques de fuerza bruta
- **CORS** para seguridad en las comunicaciones cross-origin
- **Winston** para el sistema de logs

## Instalación y Ejecución

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB (local o en la nube)

### Configuración del Backend

1. Clona este repositorio:

   ```bash
   git clone https://github.com/mauroociappinaph/taskm.git
   cd taskm/project/back
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un Archivo `.env` con las siguientes variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/taskmate
   JWT_SECRET=tu_clave_secreta_para_jwt
   NODE_ENV=development
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

### Configuración del Frontend

1. Navega al directorio del frontend:

   ```bash
   cd ../front
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` con las siguientes variables (si es necesario):

   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Inicia la aplicación:

   ```bash
   npm run dev
   ```

5. Abre tu navegador en `http://localhost:5173`

## Decisiones Técnicas

### Arquitectura

- **Estructura modular**: Organización clara del código con separación de responsabilidades (controllers, models, routes, middlewares)
- **Context API de React**: Gestión de estado global para autenticación y tareas, evitando prop drilling y simplificando el código
- **Validación en ambos lados**: Implementación de validaciones tanto en el cliente como en el servidor para garantizar consistencia y seguridad

### Seguridad

- **Rate limiting**: Protección contra ataques de fuerza bruta con límites de tasa diferentes para rutas generales (100 req/15min) y de autenticación (10 req/hora)
- **Almacenamiento seguro de contraseñas**: Uso de bcrypt para hash y verificación de contraseñas
- **Rutas protegidas**: Middleware de autenticación para asegurar acceso solo a usuarios autorizados
- **Validación de inputs**: Prevención de inyecciones y validación tanto en frontend como backend

### UX/UI

- **Feedback visual instantáneo**: Las validaciones en tiempo real proporcionan retroalimentación inmediata al usuario
- **Confirmaciones modales**: Previenen eliminaciones accidentales de tareas
- **Animaciones sutiles**: Mejoran la experiencia de usuario sin distraer de la funcionalidad principal
- **Diseño responsivo**: Experiencia consistente en dispositivos móviles y de escritorio

Link del repositorio: [https://github.com/mauroociappinaph/taskm](https://github.com/mauroociappinaph/taskm)
