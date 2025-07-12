import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  movie: Movie;
}

const SingleMovie = ({ movie }: Props) => {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="relative h-fit w-full cursor-pointer overflow-hidden rounded-lg transition-transform duration-200"
    >
      <Image
        width={1920}
        height={1080}
        src={movie?.poster}
        className="aspect-[2/3] w-full object-cover"
        loading="lazy"
        alt={movie?.title}
      />
    </Link>
  );
};

export default SingleMovie;
