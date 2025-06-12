import { fetchList } from '@/api/helpers';
import { Movie } from '@/types';
import Link from 'next/link';
import { LiaImdb } from 'react-icons/lia';

interface Props {
  searchParams: {
    q?: string;
  };
}

const page = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const movies = await fetchList<Movie[]>(`Movies?select=*`, false);
  const searchQuery = query?.q?.toLowerCase().trim() || '';

  const results = movies?.filter(
    (mov) =>
      (Array.isArray(mov.cast) &&
        mov.cast.some((c) =>
          c.actor.fullName?.toLowerCase().includes(searchQuery)
        )) ||
      mov.title?.toLowerCase().includes(searchQuery)
  );

  if (!query) return;

  return (
    <main className="bg-main min-h-screen">
      <section>
        {results.length > 0 ? (
          <div className="flex flex-col gap-5 container m-auto">
            <div className="text-2xl text-slate-200 mt-4">
              Results for: {query.q}
            </div>
            {results.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="flex gap-5 text-slate-200"
              >
                <div className="h-fit w-1/5 overflow-hidden rounded-lg md:h-auto">
                  <img
                    src={movie?.poster}
                    className="aspect-[2/3] w-full object-cover"
                    alt={movie?.title}
                  />
                </div>
                <div className="flex w-4/5 flex-col gap-5 py-3">
                  <div className="flex items-center gap-1">
                    <h3 className="md:text-3xl text-lg font-bold">
                      {movie?.title}
                    </h3>
                    <span className="mt-1 md:text-xl text-sm text-gray-400">
                      ({movie?.year})
                    </span>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-3 md:text-base text-sm">
                      <li>
                        Director{movie?.directors?.length > 1 ? 's' : ''}:{' '}
                        {movie?.directors?.map((director, i, arr) => (
                          <span className="text-gray-400" key={director.id}>
                            {director.fullName}
                            {i === arr.length - 1 ? '' : ', '}
                          </span>
                        ))}
                      </li>
                      <li>
                        Genres:{'  '}
                        {movie?.genres?.map((genre, i, arr) => (
                          <span className="text-gray-400" key={i}>
                            {genre}
                            {i === arr.length - 1 ? '' : ', '}
                          </span>
                        ))}
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2">
                    <LiaImdb className="text-yellow-400" size={25} />
                    <span className="text-[14px]">{movie?.rating}</span>
                  </div>
                  <div></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-slate-300 container m-auto text-center py-10">
            <p>No Movie Found</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
