/**
 * Interface for the register form component props
 * @interface RegisterFormProps
 * @property {Function} onSwitchToLogin - Function to switch to the login form
 */
export interface RegisterFormProps {
  onSwitchToLogin: () => void;
}
