import { Image } from './image';

interface Videos {
  credit: string;
  showTitle: string;
  url: string;
  videoTitle: string;
}

export interface Media {
  availableForPerformance: boolean;
  availableForTour: boolean;
  content: string;
  id: string;
  images: Image[];
  subtitle: string;
  title: string;
  videos: Videos[];
}
