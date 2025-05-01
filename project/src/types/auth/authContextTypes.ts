import { User } from "../userTypes";
import { WithLoadingState } from "../commonTypes";

/**
 * Interface representing the authentication context state and methods
 * @interface AuthContextType
 * @extends WithLoadingState
 * @property {User | null} user - The currently authenticated user
 * @property {boolean} isAuthenticated - Whether a user is currently authenticated
 * @property {Function} login - Function to handle user login
 * @property {Function} register - Function to handle user registration
 * @property {Function} logout - Function to handle user logout
 */
export interface AuthContextType extends WithLoadingState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}
