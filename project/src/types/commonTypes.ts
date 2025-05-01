/**
 * Base interface for entities with common properties
 * @interface BaseEntity
 * @property {string} id - Unique identifier
 * @property {Date} createdAt - Creation timestamp
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
}

/**
 * Interface for components or contexts that handle loading states
 * @interface WithLoadingState
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 */
export interface WithLoadingState {
  loading: boolean;
  error: string | null;
}

/**
 * Type for API response status
 * @type ApiStatus
 */
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Generic interface for API responses
 * @interface ApiResponse
 * @template T - Type of the data payload
 */
export interface ApiResponse<T> {
  data: T;
  status: ApiStatus;
  message?: string;
}

/**
 * Type for task filter options
 * @type TaskFilter
 */
export type TaskFilter = 'all' | 'active' | 'completed';

/**
 * Type for sorting order
 * @type SortOrder
 */
export type SortOrder = 'asc' | 'desc';
