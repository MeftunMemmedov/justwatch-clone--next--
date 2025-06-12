'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface Props {
  trailers: string[];
}

const TrailerSlider = ({ trailers }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isSlideBegin, setIsSlideBegin] = useState<boolean>(false);
  const [isSlideEnd, setIsSlideEnd] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const swiperSettings: SwiperProps = {
    spaceBetween: 30,
    freeMode: true,
    onSwiper: (swiper) => {
      setIsSlideBegin(swiper.isBeginning);
    },
    onSlideChange: (swiper) => {
      setIsSlideBegin(swiper.isBeginning);
      setIsSlideEnd(swiper.isEnd);
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    modules: [FreeMode, Pagination],
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

  if (!isMounted) return null;
  return (
    <div className="movieinfo-slider relative h-64 group">
      {showNavigation && (
        <div className="movieinfo-slider-nav-btns  absolute top-0 left-0 flex h-full w-full justify-between text-white">
          <button
            className={`z-50 hidden cursor-pointer bg-[rgba(6,13,23,.8)] px-2 group-hover:block ${
              isSlideBegin ? 'opacity-0' : ''
            }`}
            onClick={() => slideTo('prev')}
          >
            <IoIosArrowBack size={35} />
          </button>
          <button
            className={`z-50 hidden cursor-pointer bg-[rgba(6,13,23,.8)] px-2 group-hover:block ${
              isSlideEnd ? 'opacity-0' : ''
            }`}
            onClick={() => slideTo('next')}
          >
            <IoIosArrowForward size={35} />
          </button>
        </div>
      )}
      <Swiper
        ref={swiperRef}
        className="trailerSwiper h-full"
        {...swiperSettings}
      >
        {trailers?.map((trailer, index) => (
          <SwiperSlide key={index}>
            <ReactPlayer
              width={'100%'}
              height={'100%'}
              url={trailer}
              controls
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrailerSlider;
