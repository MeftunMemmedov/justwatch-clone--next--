'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { Actor } from '@/types';

interface Props {
  cast: Actor[];
}

const CastSlider = ({ cast }: Props) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isSlideBegin, setIsSlideBegin] = useState<boolean | undefined>();
  const [isSlideEnd, setIsSlideEnd] = useState<boolean | undefined>();
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

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
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 2,
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
  return (
    <div className="movieinfo-slider group relative h-auto">
      {showNavigation && (
        <div className="movieinfo-slider-nav-btns absolute top-0 left-0 flex h-full w-full justify-between text-white">
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
      <Swiper ref={swiperRef} className="castSwiper" {...swiperSettings}>
        {cast?.map((actor, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center gap-2 rounded-lg bg-[#101720] py-5">
              <div className="size-[90px] overflow-hidden rounded-full">
                <img
                  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  alt=""
                />
              </div>
              <Link
                href={`/persons/${actor.actor.id}`}
                className="cursor-pointer text-sm text-[#78a6b8] hover:text-gray-300"
              >
                {actor.actor.fullName}
              </Link>
              <h4 className="cursor-pointer text-sm font-semibold text-slate-400">
                {actor.character}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CastSlider;
