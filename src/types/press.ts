import { Image } from './image';

export interface Press {
  author: string;
  date: string;
  description: string;
  image: Image;
  logo: Image;
  outlet: string;
  url: string;
}
