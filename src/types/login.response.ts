import { User } from '../entities/user';

export type LoginResponse = {
  user: User;
  token: string;
};
