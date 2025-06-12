import { Actor } from '../artist';
import { Person } from '../person';

export type Movie = {
  id: string;
  title: string;
  genres: string[];
  year: string;
  rating: number;
  description: string;
  type: string;
  trailer_urls: string[];
  images: string[];
  age_rating: string;
  poster: string;
  poster_bg: string;
  directors: Person[];
  cast: Actor[];
  likes: string[];
  dislikes: string[];
};
