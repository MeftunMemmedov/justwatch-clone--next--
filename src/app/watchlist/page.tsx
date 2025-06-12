import { fetchList } from '@/api/helpers';
import WatchlistMessage from '@/components/Watchlist/WatchlistMessage';
import MovieList from '@/components/Watchlist/WatchlistPage/MovieList';
import { Movie } from '@/types';

const Page = async ({ user = true }) => {
  const [watchlist, movies] = await Promise.all([
    fetchList<{ id: string; userId: string; movieId: string }[]>(
      'Movies-Watchlist',
      false
    ),
    fetchList<Movie[]>('/Movies?select=*', false),
  ]);

  return (
    <main className="bg-main">
      <section>
        <div className="container m-auto min-h-screen px-2 lg:px-5">
          <div className="flex items-center gap-5 py-3">
            <h2 className="relative inline pb-2 text-sm font-semibold text-gray-200 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-1/2 after:bg-yellow-400 after:content-[''] sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">
              Watchlist
            </h2>
          </div>
          {user ? (
            <MovieList watchlist={watchlist} movies={movies} />
          ) : (
            <WatchlistMessage />
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
