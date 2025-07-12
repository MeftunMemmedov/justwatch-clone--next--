import { fetchDetails, fetchList } from '@/api/helpers';
import SingleMovie from '@/components/Common/SingleMovie/SingleMovie';
import { Movie, Person } from '@/types';
import Image from 'next/image';

const page = async ({ params }: { params: Promise<{ personId: string }> }) => {
  const { personId } = await params;
  const person = await fetchDetails<Person>(`Movies-Artists?id=eq.${personId}`);
  const movies = await fetchList<Movie[]>(`Movies?select=*`, false);
  const relatedMovies = movies.filter((mov) =>
    mov.cast.some((c) => c.actor.id == personId)
  );
  if (!person)
    return (
      <div className="md:min-h-screen h-72 flex justify-center items-center bg-main text-slate-400">
        <p>Person not found</p>
      </div>
    );
  return (
    <main className="bg-main">
      <section>
        <div className="flex flex-col gap-3 items-center text-slate-400 ">
          <div className="w-32 h-32 relative rounded-full overflow-hidden">
            <Image
              src={'https://placehold.co/600x400/webp'}
              fill
              alt={person?.fullName}
              className="object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{person.fullName}</h1>
          <div className="text-center md:px-20 px-5 pb-10">
            <p>{person?.bio}</p>
          </div>
        </div>
      </section>
      <section className="container m-auto min-h-screen px-2 lg:px-5">
        <div>
          <h3 className="text-slate-400 text-3xl font-bold">
            Movies Known For
          </h3>
        </div>
        <div className="grid gap-8 py-4 text-white min-[475px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
          {relatedMovies?.map((mov) => (
            <SingleMovie movie={mov} key={mov.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
