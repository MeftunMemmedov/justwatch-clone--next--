import { Movie } from '@/types';
import Link from 'next/link';
import React from 'react';
import { IoBookmarkSharp } from 'react-icons/io5';

interface Props {
  movie: Movie;
  isInWatchlist?: boolean;
  user?: boolean;
}

const SingleMovie = ({ movie, isInWatchlist = false, user = false }: Props) => {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="relative h-fit w-full cursor-pointer overflow-hidden rounded-lg transition-transform duration-200"
    >
      <div className="absolute top-0 left-0 z-20 w-full rounded-br-lg shadow-[inset_0_15px_10px_-10px_rgba(0,0,0,0.75)]">
        {user ? (
          <IoBookmarkSharp
            // onClick={handleWatchlistAction}
            size={35}
            className={`text-shadow-2xl mt-[-3px] transition-all duration-300 text-shadow-black ${
              isInWatchlist
                ? 'text-yellow-500'
                : 'text-white opacity-75 hover:opacity-100'
            }`}
          />
        ) : (
          <>{/* <AskAuth type={'watchlist-singlemovie'} /> */}</>
        )}
      </div>
      <img
        src={movie?.poster}
        className="aspect-[2/3] w-full object-cover"
        loading="lazy"
        alt={movie?.title}
      />
    </Link>
  );
};

export default SingleMovie;
