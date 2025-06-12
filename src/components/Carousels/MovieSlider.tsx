'use client';
import { useRef, useState } from 'react';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SingleMovie from '../Common/SingleMovie/SingleMovie';
import { Movie } from '@/types';

interface Props {
  movies: Movie[];
  atHome?: boolean;
}

const MovieSlider = ({ movies, atHome = false }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isSlideBegin, setIsSlideBegin] = useState<boolean | undefined>();
  const [isSlideEnd, setIsSlideEnd] = useState<boolean | undefined>();
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  const swiperSettings: SwiperProps = {
    spaceBetween: 30,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      500: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    freeMode: true,
    modules: [FreeMode, Pagination],
    onSwiper: (swiper) => {
      setIsSlideBegin(swiper.isBeginning);
    },
    onSlideChange: (swiper) => {
      setIsSlideBegin(swiper.isBeginning);
      setIsSlideEnd(swiper.isEnd);
    },
    onAfterInit: (swiper) => {
      setShowNavigation(
        swiper.slides.length > Number(swiper.params.slidesPerView)
      );
    },
    onResize: (swiper) => {
      setShowNavigation(
        swiper.slides.length > Number(swiper.params.slidesPerView)
      );
    },
  };

  const slideTo = (direction: string) => {
    if (swiperRef.current) {
      if (direction === 'next') {
        swiperRef.current.swiper.slideNext();
      } else if (direction === 'prev') {
        swiperRef.current.swiper.slidePrev();
      }
    }
  };

  return (
    <div className="movieinfo-slider group relative h-auto">
      {showNavigation && (
        <div className="movieinfo-slider-nav-btns absolute top-0 left-0 flex h-full w-full justify-between">
          <button
            className={`z-50 hidden cursor-pointer bg-[rgba(6,13,23,.8)] px-2 group-hover:block ${
              isSlideBegin ? 'opacity-0' : ''
            }`}
            onClick={() => slideTo('prev')}
          >
            <IoIosArrowBack size={35} color="gray" />
          </button>
          <button
            className={`z-50 hidden cursor-pointer bg-[rgba(6,13,23,.8)] px-2 group-hover:block ${
              isSlideEnd ? 'opacity-0' : ''
            }`}
            onClick={() => slideTo('next')}
          >
            <IoIosArrowForward size={35} color="gray" />
          </button>
        </div>
      )}
      <Swiper ref={swiperRef} className="movieSwiper" {...swiperSettings}>
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            {atHome ? (
              <div className="flex items-end justify-between my-4 ml-8">
                <div className="relative lg:h-[300px] h-[200px] w-5">
                  <span className="text-custom-slate2 absolute bottom-0 -left-10 -z-10 text-[130px] font-bold">
                    {index + 1}
                  </span>
                </div>
                <div className="">
                  <SingleMovie movie={movie} key={index} />
                </div>
              </div>
            ) : (
              <SingleMovie movie={movie} key={index} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
