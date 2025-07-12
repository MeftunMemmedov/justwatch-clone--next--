'use client';
import { fetchList } from '@/api/helpers';
import SingleMovie from '@/components/Common/SingleMovie/SingleMovie';
import WatchlistMessage from '@/components/Watchlist/WatchlistMessage';
import { GlobalContext } from '@/context/GlobalContext';
import { Movie } from '@/types';
import { use, useEffect, useState } from 'react';
import Loading from '@/components/Common/Loading';

const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = use(GlobalContext) as any;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<
    { id: string; userId: string; movieId: string }[]
  >([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const [watchlistData, movieData] = await Promise.all([
        fetchList<{ id: string; userId: string; movieId: string }[]>(
          `Movies-Watchlist?userId=eq.${user?.id}`,
          false
        ),
        fetchList<Movie[]>('/Movies?select=*', false),
      ]);
      setMovies(movieData);
      setWatchlist(watchlistData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user !== null) {
      getData();
    }
  }, [user]);

  if (typeof window !== 'undefined') {
    document.title = 'Justwatch | Watchlist';
  }

  if (isLoading) return <Loading />;

  return (
    <main className="bg-main">
      <section>
        <div className="container m-auto min-h-screen px-2 lg:px-5">
          <div className="flex items-center gap-5 py-3">
            <h2 className="relative inline pb-2 text-sm font-semibold text-gray-200 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-1/2 after:bg-yellow-400 after:content-[''] sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">
              Watchlist
            </h2>
          </div>
          {user && watchlist.length > 0 ? (
            <div className="grid gap-8 py-4 text-white min-[475px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
              {watchlist.map((mov) => {
                const movie = movies.find((m) => m.id === mov.movieId)!;

                return <SingleMovie movie={movie} key={mov.id} />;
              })}
            </div>
          ) : (
            <WatchlistMessage />
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
