'use client';
import { GlobalContext } from '@/context/GlobalContext';
import React, { use } from 'react';

const WatchlistMessage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setUserDialogOpen } = use(GlobalContext) as any;

  return (
    <div className="flex h-screen items-center justify-center text-gray-300">
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="text-4xl font-semibold">Watchlist</h3>
        <p>Add movies to the Watchlist to save it for later</p>
        <button
          className="rounded-md bg-yellow-400 px-8 py-2 text-black"
          onClick={() => setUserDialogOpen(true)}
        >
          Sign In Now
        </button>
      </div>
    </div>
  );
};

export default WatchlistMessage;
