/**
 * Interface representing the login form properties
 * @interface LoginFormProps
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {Function} onSwitchToRegister - Function to switch to register form
 */
export
interface LoginData {
  email: string;
  password: string;
  onSwitchToRegister: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
}
