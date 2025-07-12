'use client';

import React, { useEffect, useState, useContext } from 'react';
import AskAuth from '../Common/AskAuth';
import { Movie } from '@/types';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { IoBookmark } from 'react-icons/io5';
import { GlobalContext } from '@/context/GlobalContext';
import {
  dislikeMovie,
  likeMovie,
  removeFromWatchList,
  sendToWatchList,
} from '@/api/server-actions';
import { fetchDetails, fetchList } from '@/api/helpers';
import { CircularProgress } from '@mui/material';

interface Props {
  movie: Movie;
}

const MovieButtons = ({ movie }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useContext(GlobalContext) as any;

  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [watchlist, setWatchlist] = useState<
    { movieId: string; userId: string }[]
  >([]);
  const [loading, setLoading] = useState({
    like: false,
    dislike: false,
    watchlist: false,
  });

  const inWatchlist = watchlist.some(
    (mov) => mov.userId === user?.id && mov.movieId === movie.id
  );

  const getLikeDislikes = async () => {
    try {
      const res = await fetchDetails<Movie>(`Movies?id=eq.${movie.id}`);
      setLikes(res.likes || []);
      setDislikes(res.dislikes || []);
    } catch (error) {
      console.error('Error fetching likes/dislikes:', error);
    }
  };

  const getWatchList = async () => {
    try {
      const res = await fetchList<{ movieId: string; userId: string }[]>(
        'Movies-Watchlist',
        false
      );
      setWatchlist(res || []);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  useEffect(() => {
    if (user && movie) {
      getLikeDislikes();
      getWatchList();
    }
  }, [user, movie]);

  const handleLike = async () => {
    if (loading.like || loading.dislike) return;

    setLoading((prev) => ({ ...prev, like: true }));

    const prevLikes = likes;
    const prevDislikes = dislikes;

    const newLikes = prevLikes.includes(user.id)
      ? prevLikes.filter((id) => id !== user.id)
      : [...prevLikes, user.id];

    const newDislikes = prevDislikes.includes(user.id)
      ? prevDislikes.filter((id) => id !== user.id)
      : prevDislikes;

    setLikes(newLikes);
    setDislikes(newDislikes);

    try {
      await likeMovie(movie, user.id);
    } catch (error) {
      console.error('Error liking movie:', error);
      setLikes(prevLikes);
      setDislikes(prevDislikes);
    } finally {
      setLoading((prev) => ({ ...prev, like: false }));
    }
  };

  const handleDislike = async () => {
    if (loading.dislike || loading.like) return;

    setLoading((prev) => ({ ...prev, dislike: true }));

    const prevLikes = likes;
    const prevDislikes = dislikes;

    const newDislikes = prevDislikes.includes(user.id)
      ? prevDislikes.filter((id) => id !== user.id)
      : [...prevDislikes, user.id];

    const newLikes = prevLikes.includes(user.id)
      ? prevLikes.filter((id) => id !== user.id)
      : prevLikes;

    setDislikes(newDislikes);
    setLikes(newLikes);

    try {
      await dislikeMovie(movie, user.id);
    } catch (error) {
      console.error('Error disliking movie:', error);
      setDislikes(prevDislikes);
      setLikes(prevLikes);
    } finally {
      setLoading((prev) => ({ ...prev, dislike: false }));
    }
  };

  const handleWatchlistToggle = async () => {
    setLoading((prevLoading) => ({ ...prevLoading, watchlist: true }));

    try {
      if (inWatchlist) {
        await removeFromWatchList(user.id, movie.id);
      } else {
        await sendToWatchList(user.id, movie.id);
      }

      setWatchlist((prev) =>
        inWatchlist
          ? prev.filter(
              (item) => !(item.userId === user.id && item.movieId === movie.id)
            )
          : [...prev, { userId: user.id, movieId: movie.id }]
      );
    } catch (error) {
      console.error('Error updating watchlist:', error);
      await getWatchList();
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, watchlist: false }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-4 text-slate-300">
      {user ? (
        <button
          disabled={loading.like || loading.dislike}
          className={`flex items-center justify-center rounded-lg bg-[#222c38] py-3 ${
            likes.includes(user.id) ? 'text-yellow-400' : ''
          }`}
          onClick={handleLike}
        >
          <div className="flex items-center gap-2">
            {loading.like || loading.dislike ? (
              <CircularProgress size={20} color="warning" />
            ) : (
              <>
                <BiSolidLike size={20} />
                <span>{likes.length}</span>
              </>
            )}
          </div>
        </button>
      ) : (
        <AskAuth type="like" movie={movie} />
      )}

      {user ? (
        <button
          disabled={loading.dislike || loading.like}
          className={`flex items-center justify-center rounded-lg bg-[#222c38] py-3 ${
            dislikes.includes(user.id) ? 'text-yellow-400' : ''
          }`}
          onClick={handleDislike}
        >
          <div className="flex items-center gap-2">
            {loading.dislike || loading.like ? (
              <CircularProgress size={20} color="warning" />
            ) : (
              <>
                <BiSolidDislike size={20} />
                <span>{dislikes.length}</span>
              </>
            )}
          </div>
        </button>
      ) : (
        <AskAuth type="dislike" movie={movie} />
      )}

      {user ? (
        <button
          disabled={loading.watchlist}
          className={`col-span-2 flex items-center justify-center rounded-lg bg-[#222c38] py-3 ${
            inWatchlist ? 'text-yellow-400' : ''
          }`}
          onClick={handleWatchlistToggle}
        >
          <div className="flex items-center gap-2">
            {loading.watchlist ? (
              <CircularProgress size={20} color="warning" />
            ) : (
              <>
                <IoBookmark size={20} />
                {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </>
            )}
          </div>
        </button>
      ) : (
        <AskAuth type="watchlist" movie={movie} />
      )}
    </div>
  );
};

export default MovieButtons;
