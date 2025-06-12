import { fetchDetails, fetchList } from '@/api/helpers';
import CastSlider from '@/components/Carousels/CastSlider';
import MovieSlider from '@/components/Carousels/MovieSlider';
import TrailerSlider from '@/components/Carousels/TrailerSlider';
import MovieButtons from '@/components/MovieButtons/MovieButtons';
import TrailerPlayer from '@/components/Trailer/TrailerPlayer/TrailerPlayer';
import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { LiaImdb } from 'react-icons/lia';

interface Props {
  params: { movieId: string };
  user?: boolean;
}

const page = async ({ params }: Props) => {
  const { movieId } = await params;
  const movies = await fetchList<Movie[]>('Movies?select=*', false);

  const movie = await fetchDetails<Movie>(`Movies?id=eq.${movieId}`);

  const similarMovies =
    movie &&
    movies?.filter(
      (mov) =>
        (mov?.genres.includes(movie?.genres[0]) ||
          mov?.genres.includes(movie?.genres[1])) &&
        movie.title !== mov.title
    );

  if (!movie)
    return (
      <div className="md:min-h-screen h-72 flex justify-center items-center bg-main text-slate-400">
        <p>Movie not found</p>
      </div>
    );
  return (
    <main className="bg-main min-h-screen">
      <section>
        <div className="container m-auto px-2 lg:px-5">
          <div className="flex w-full items-center justify-between py-5">
            <div>
              <h2 className="text-xl text-gray-300">{movie?.title}</h2>
              <h5 className="text-sm text-gray-500">{movie?.year}</h5>
            </div>
            <div></div>
          </div>
        </div>
      </section>
      <section>
        {/* COVER */}
        <div className="relative my-8 h-[120px] min-[500px]:h-[250px]">
          <div className="relative flex h-full items-center justify-end">
            <div className="absolute top-0 left-0 size-full bg-gradient-to-r from-[#0C131E] via-[#0C131E] via-20% to-[rgba(237,221,83,0)] to-100% min-[500px]:via-50%"></div>
            <div className="h-full w-full min-[500px]:w-1/2">
              <Image
                width={1920}
                height={1080}
                src={movie?.poster_bg}
                className="size-full object-cover"
                alt={movie?.title}
              />
            </div>
          </div>
          <div className="absolute top-0 left-0 flex size-full flex-col">
            <div className="container m-auto flex h-full px-5 min-[500px]:py-8 lg:px-10">
              <div className="hidden w-1/2 flex-col gap-12 min-[500px]:flex">
                <div className="flex flex-col gap-6">
                  <h2 className="text-[32px] font-bold text-white">
                    {movie?.title}{' '}
                    <span className="text-xl text-gray-500">
                      ({movie?.year})
                    </span>
                  </h2>
                  <div className="flex items-center gap-1 text-nowrap md:gap-2 text-slate-300">
                    <div className="flex items-center">
                      <BsPlayFill size={30} color="gold" />
                      <span>{Math.floor(Math.random() * (90 - 50) + 50)}%</span>
                    </div>
                    -
                    <div className="flex items-center gap-1">
                      <LiaImdb size={25} color="gold" />
                      <span className="text-sm text-[#78a6b8]">
                        {movie?.rating}
                      </span>
                    </div>
                    -<div>{movie?.age_rating}</div>
                  </div>
                </div>
                <div className="hidden-scrollbar flex flex-nowrap gap-3 overflow-x-scroll text-slate-400">
                  <a
                    href="#synopsis"
                    className="cursor-pointer rounded-full bg-[#111924] px-4 py-2 text-nowrap hover:bg-[#1b283a]"
                  >
                    <p>Synopsis</p>
                  </a>
                  <a
                    href="#trailers"
                    className="cursor-pointer rounded-full bg-[#111924] px-4 py-2 text-nowrap hover:bg-[#1b283a]"
                  >
                    <p>Trailers</p>
                  </a>
                  <a
                    href="#cast"
                    className="cursor-pointer rounded-full bg-[#111924] px-4 py-2 text-nowrap hover:bg-[#1b283a]"
                  >
                    <p>Cast</p>
                  </a>
                  <a
                    href="#similarmovies"
                    className="cursor-pointer rounded-full bg-[#111924] px-4 py-2 text-nowrap hover:bg-[#1b283a]"
                  >
                    <p>Similar Movies</p>
                  </a>
                </div>
              </div>
              <div className="w-1/2">
                <TrailerPlayer trailerUrl={movie?.trailer_urls[0]} />
              </div>
            </div>
          </div>
        </div>
        {/* COVER */}
      </section>
      <section>
        {/* INFO */}
        <div className="container m-auto px-5 min-[665px]:px-0">
          <div className="grid grid-cols-6 gap-12">
            <div className="col-span-6 lg:col-span-4">
              <div className="mb-10" id="synopsis">
                <h3 className="mb-3 text-[22px] font-bold text-white uppercase">
                  Synopsis
                </h3>
                <p className="text-slate-400">{movie?.description}</p>
              </div>
              {movie?.trailer_urls.length > 0 ? (
                <div id="trailers">
                  <h3 className="mb-1 text-[22px] font-bold text-white uppercase">
                    Trailers
                  </h3>
                  <TrailerSlider trailers={movie?.trailer_urls} />
                </div>
              ) : null}
              {movie.cast.length > 0 ? (
                <div className="mt-5" id="cast">
                  <h3 className="mb-3 text-[22px] font-bold text-white uppercase">
                    Cast
                  </h3>
                  <CastSlider cast={movie?.cast} />
                </div>
              ) : null}
              <div className="mt-5 mb-10" id="similarmovies">
                <h3 className="mb-3 text-[22px] font-bold text-white uppercase">
                  Similar Movies
                </h3>
                <MovieSlider movies={similarMovies} />
              </div>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <div className="flex flex-col">
                <div className="flex">
                  <div className="flex w-1/2 flex-col gap-4 lg:w-3/5">
                    <h3 className="mt-2 text-xs font-bold uppercase sm:text-base xl:text-[22px] text-white">
                      About The Movie
                    </h3>
                    <div>
                      <h3 className="mb-2 font-semibold text-[#6a7c8f] uppercase">
                        Directors
                      </h3>
                      <div className="flex flex-col gap-2 text-gray-400">
                        {movie?.directors?.map((director, i, arr) => (
                          <Link
                            href={`/artists/${director.id}`}
                            className="text-gray-400"
                            key={i}
                          >
                            {director.fullName}
                            {i === arr.length - 1 ? '' : ', '}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-[#6a7c8f] uppercase">
                        Rating
                      </h3>
                      <div className="flex items-center gap-1">
                        <BsPlayFill size={30} color="gold" />
                        <span className="text-slate-300">84%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <LiaImdb size={30} color="gold" />
                        <span className="text-[#78a6b8]">{movie?.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-1/2 justify-end lg:w-2/5">
                    <img
                      src={movie?.poster}
                      className="aspect-[2/3] h-[220px] w-[150px] rounded-lg object-cover"
                      alt={movie?.title}
                    />
                  </div>
                </div>
                <MovieButtons movie={movie!} />
                <hr className="mt-2 mb-5 text-gray-800" />
                <div className="">
                  <div>
                    <h3 className="mb-3 font-semibold text-[#6a7c8f]">
                      Genres
                    </h3>
                    {movie?.genres?.map((genre, i, arr) => (
                      <span className="text-gray-400" key={i}>
                        {genre}
                        {i === arr.length - 1 ? '' : ', '}
                      </span>
                    ))}
                  </div>
                  <hr className="mt-2 mb-5 text-gray-800" />
                  <div>
                    <h3 className="mb-3 font-semibold text-[#6a7c8f]">
                      Age Rating
                    </h3>
                    <span className="text-gray-400">{movie?.age_rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* INFO */}
      </section>
    </main>
  );
};

export default page;
