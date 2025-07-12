import Image from 'next/image';
import Link from 'next/link';
import { HomeBg } from '../assets/images';
import MovieSlider from '@/components/Carousels/MovieSlider';
import { fetchList } from '@/api/helpers';
import { Movie } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Justwatch | Home',
  description:
    'Find where to stream new, popular & upcoming entertainment with JustWatch.',
};

const Home = async () => {
  const movies = await fetchList<Movie[]>('/Movies?rating=gte.4&limit=10', 100);

  return (
    <main className="bg-main">
      <section>
        <div className="relative md:h-[600px] h-[400px] border">
          <Image
            fill
            src={HomeBg}
            className="size-full object-cover"
            alt="movies"
          />
          <div className="absolute top-0 left-0 size-full bg-[linear-gradient(0deg,_rgba(7,14,23,1)_8%,_rgba(255,255,255,0)_100%)]">
            <div className="container m-auto flex size-full flex-col items-center justify-center gap-10 px-2 text-gray-200 lg:px-5">
              <h3 className="w-11/12 text-center text-2xl font-bold sm:text-4xl md:w-4/5 md:text-6xl lg:w-3/5 2xl:text-8xl">
                Your streaming guide for movies
              </h3>
              <p className="w-4/5 text-center text-xl text-gray-400">
                Find where to stream new, popular & upcoming entertainment with
                JustWatch.
              </p>
              <Link
                href="/movies"
                className="rounded-md border border-yellow-400 bg-yellow-400 hover:bg-transparent py-2 px-5 text-center text-sm font-semibold text-black hover:text-yellow-400 transition-all duration-500 md:w-96 md:px-0 md:text-lg"
              >
                Discover Movies
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container m-auto px-2 lg:px-5">
          <h3 className="lg:w-3/5 w-11/12 py-20 lg:text-5xl md:text-4xl text-3xl md:text-start text-center font-bold text-gray-300">
            Browse new, popular and upcoming movies
          </h3>
          <div className="flex lg:flex-row flex-col">
            <div className="lg:w-1/5 w-full pr-10 text-white">
              <h4 className="mb-4 text-2xl font-bold">
                Top 5 movies this week
              </h4>
              <p className="text-gray-400">
                Check out this week’s most popular movies
              </p>
            </div>
            <div className="lg:w-4/5 w-full">
              <MovieSlider movies={movies} atHome={true} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
