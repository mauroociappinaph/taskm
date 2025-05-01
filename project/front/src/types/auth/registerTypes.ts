/**
 * Interface representing the registration form properties
 * @interface RegisterFormProps
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */
export interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
