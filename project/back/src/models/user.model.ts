import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types/index';

/**
 * Schema de Mongoose para el modelo de Usuario.
 * Define la estructura de los documentos de usuario en la base de datos.
 *
 * @property {string} email - Email único del usuario (requerido)
 * @property {string} password - Contraseña hasheada del usuario (requerido)
 * @property {string} name - Nombre del usuario (requerido)
 * @property {Date} createdAt - Fecha de creación (generada automáticamente)
 * @property {Date} updatedAt - Fecha de última actualización (generada automáticamente)
 */
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
}, { timestamps: true });

/**
 * Middleware pre-save para hashear automáticamente la contraseña.
 * Se ejecuta antes de guardar un documento y solo si la contraseña ha sido modificada.
 * Utiliza bcrypt para generar un salt aleatorio y hashear la contraseña.
 */
userSchema.pre('save', async function(next) {
  // Solo hashea la contraseña si ha sido modificada o es nueva
  if (!this.isModified('password')) return next();

  // Genera un salt con factor de costo 10
  const salt = await bcrypt.genSalt(10);
  // Hashea la contraseña con el salt generado
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Método del documento para comparar contraseñas.
 * Compara una contraseña en texto plano con la contraseña hasheada del usuario.
 *
 * @param {string} candidatePassword - Contraseña en texto plano a comparar
 * @returns {Promise<boolean>} Promise que resuelve a true si las contraseñas coinciden
 */
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exporta el modelo User basado en el schema y la interfaz IUser
export const User = model<IUser>('User', userSchema);
