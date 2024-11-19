import { Image } from './image';

export interface Options {
  content: string;
  noClasses?: string;
  richtextContent?: string;
  video?: string;
}

export interface Page {
  image: Image;
  images: Image[];
  imgCredit: string;
  options: Options;
  pageName: string;
  subtitle: string;
  title: string;
  vidoes: string[];
}
