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


/**
 * Interface representing the registration form data
 * @interface RegisterData
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {Function} onSwitchToLogin - Function to switch to login form
 */

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  onSwitchToLogin: () => void;
}
