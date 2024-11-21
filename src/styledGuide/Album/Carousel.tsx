import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface CustomCarouselProps {
  sources: { src: string }[];
}

export default function CustomCarousel({ sources }: CustomCarouselProps) {
  return (
    <Swiper spaceBetween={10} slidesPerView={1}>
      {sources.map(({ src }, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt={`Slide ${index}`} style={{ width: '100%' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
