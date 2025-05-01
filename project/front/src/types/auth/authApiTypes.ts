/**
 * Interface for login API request
 */
export interface LoginApiData {
  email: string;
  password: string;
}

/**
 * Interface for register API request
 */
export interface RegisterApiData {
  email: string;
  password: string;
  name: string;
}
