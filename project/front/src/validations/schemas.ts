import * as yup from 'yup';

/**
 * Esquema de validación para el formulario de inicio de sesión.
 * Valida:
 * - Email: formato válido y campo obligatorio
 * - Contraseña: campo obligatorio
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
});

/**
 * Esquema de validación para el formulario de registro.
 * Valida:
 * - Nombre: campo obligatorio
 * - Email: formato válido y campo obligatorio
 * - Contraseña: requisitos de seguridad (mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número)
 */
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
});

/**
 * Esquema de validación para el formulario de tareas.
 * Valida:
 * - Texto de la tarea: campo obligatorio y límite de caracteres
 */
export const taskSchema = yup.object().shape({
  text: yup
    .string()
    .required('La descripción de la tarea es obligatoria')
    .min(3, 'La tarea debe tener al menos 3 caracteres')
    .max(100, 'La tarea no puede exceder los 100 caracteres')
});

/**
 * Función auxiliar para validar campos individuales con Yup.
 *
 * @param schema - Esquema de validación Yup
 * @param field - Nombre del campo a validar
 * @param value - Valor a validar
 * @returns String con el mensaje de error o null si no hay errores
 */
export const validateField = async (
  schema: yup.ObjectSchema<Record<string, unknown>>,
  field: string,
  value: unknown
): Promise<string | null> => {
  try {
    // Crea un objeto donde la clave es el nombre del campo y el valor es el valor a validar
    await schema.validateAt(field, { [field]: value });
    return null;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return 'Error de validación';
  }
};
