'use server';

import axios from 'axios';

import { apiKey, apiUrl } from '@/constants';
import { Movie } from '@/types';

export const createNewUser = async (userData: {
  email: string;
  password: string;
}) => {
  await axios.post(`${apiUrl}Movies-Users`, userData, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    } as Record<string, string>,
  });
};

export const likeMovie = async (movie: Movie, userId: string) => {
  const isLiked = movie.likes.includes(userId);
  const isDisliked = movie.dislikes.includes(userId);

  const newData = {
    likes: isLiked
      ? movie.likes.filter((id) => id !== userId)
      : [...movie.likes, userId],
    dislikes: isDisliked
      ? movie.dislikes.filter((id) => id !== userId)
      : movie.dislikes,
  };

  await axios.patch(`${apiUrl}Movies?id=eq.${movie.id}`, newData, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    } as Record<string, string>,
  });
};

export const dislikeMovie = async (movie: Movie, userId: string) => {
  const isLiked = movie.likes.includes(userId);
  const isDisliked = movie.dislikes.includes(userId);

  const newData = {
    dislikes: isDisliked
      ? movie.dislikes.filter((id) => id !== userId)
      : [...movie.dislikes, userId],
    likes: isLiked ? movie.likes.filter((id) => id !== userId) : movie.likes,
  };

  await axios.patch(`${apiUrl}Movies?id=eq.${movie.id}`, newData, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    } as Record<string, string>,
  });
};

export const sendToWatchList = async (userId: string, movieId: string) => {
  const newData = {
    movieId,
    userId,
  };
  //   await axios.get(`${apiUrl}Movies-Watchlist?select=*`).then((res) => {
  //     if (res.data.some((mov) => mov.userId === userId)) {
  //       axios.delete(`${apiUrl}Movies-Watchlist?userId=eq.${userId}`);
  //     } else {
  axios.post(`${apiUrl}Movies-Watchlist`, newData, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    //   });
    // }
  });
};

export const removeFromWatchList = async (userId: string, movieId: string) => {
  await axios.delete(
    `${apiUrl}Movies-Watchlist?userId=eq.${userId}&movieId=eq.${movieId}`,
    {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      } as Record<string, string>,
    }
  );
};
