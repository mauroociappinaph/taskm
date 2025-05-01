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
 * @property {Function} updateProfile - Function to handle user profile update
 */
export interface AuthContextType extends WithLoadingState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, email: string) => Promise<void>;
}


export interface AuthResponse {
  token: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}
