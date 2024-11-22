import { Image } from './image';

export interface Options {
  content: string;
  noClasses?: string;
  richTextContent?: string;
  video?: string;
}

export interface Page {
  image: Image;
  images: Image[];
  imgCredit: string;
  options: Options;
  $pageName?: string;
  subtitle: string;
  title: string;
  richTextContent?: string;
  videos: string[];
}
