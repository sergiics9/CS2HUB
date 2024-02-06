import { Skin } from './skin';

export type LoginUser = {
  email: string;
  passwd: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  role: 'Admin' | 'User';
  skins: Skin[];
};
