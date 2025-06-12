import { fetchList } from '@/api/helpers';
import SingleMovie from '@/components/Common/SingleMovie/SingleMovie';
import { Movie } from '@/types';
import React from 'react';

const page = async () => {
  const movies = await fetchList<Movie[]>('Movies?select=*', 100);
  return (
    <main className="bg-main">
      <section className="container m-auto min-h-screen px-2 lg:px-5">
        <div className="grid gap-8 py-4 text-white min-[475px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
          {movies?.map((mov) => <SingleMovie movie={mov} key={mov.id} />)}
        </div>
      </section>
    </main>
  );
};

export default page;
