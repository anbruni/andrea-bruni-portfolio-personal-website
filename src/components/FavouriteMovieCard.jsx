import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  { id: 1, title: 'Slide 1', color: 'bg-french-blue' },
  { id: 2, title: 'Slide 2', color: 'bg-indigo-600' },
  { id: 3, title: 'Slide 3', color: 'bg-slate-700' },
  { id: 4, title: 'Slide 4', color: 'bg-violet-700' },
];

const FavouriteMovieCard = ({ className = '' }) => {
  return (
    <div className={`mx-auto size-full max-w-lg pb-10 ${className}`}>
      <Swiper
        modules={[EffectCards, Navigation, Pagination]}
        effect="cards"
        grabCursor
        navigation
        pagination={{ clickable: true }}
        cardsEffect={{
          perSlideRotate: 8,
          perSlideOffset: 10,
        }}
        className="h-72 w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className={`${slide.color} flex items-center justify-center rounded-2xl text-2xl font-semibold text-white shadow-xl`}
          >
            {slide.title}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FavouriteMovieCard;
