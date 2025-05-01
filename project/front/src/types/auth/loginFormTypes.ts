/**
 * Interface for the login form component props
 * @interface LoginFormProps
 * @property {Function} onSwitchToRegister - Function to switch to the register form
 */
export interface LoginFormProps {
  onSwitchToRegister: () => void;
}
