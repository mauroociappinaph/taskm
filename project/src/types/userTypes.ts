import { BaseEntity } from "./commonTypes";

/**
 * Interface representing a user in the application
 * @interface User
 * @extends BaseEntity
 */
export interface User extends BaseEntity {
  name: string;
  email: string;
}
