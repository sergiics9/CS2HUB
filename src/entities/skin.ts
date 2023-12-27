import { ImgData } from '../types/img.data';

export interface Skin {
  id: string;
  name: string;
  rarity: string;
  price: string;
  category: string;
  description: string;
  image: ImgData;
  collections_name: string;
  collections_image: ImgData;
  case_image: ImgData;
  case_name: string;
}

/* export type User = {
  email: string;
  passwd: string;
}; */

export type ApiResponse = {
  skins: Skin[];
};
