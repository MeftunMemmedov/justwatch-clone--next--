import { Movie } from '@/types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Edge of Tomorrow',
    genre: ['Action', 'Sci-Fi'],
    year: '2014',
    rating: 8.0,
    descritption:
      'A soldier caught in a time loop relives his last day of battle, improving each time.',
    type: 'Movie',
    trailer_urls: ['https://www.youtube.com/watch?v=yUmSVcttXnI'],
    images: [],
    age_rating: 'PG-13',
    poster: 'https://placehold.co/200x300?text=Edge+of+Tomorrow',
    poster_bg: 'https://placehold.co/800x450?text=Edge+of+Tomorrow+BG',
    director: [
      {
        director: { id: 'd1', fullName: 'Doug Liman' },
      },
    ],
    cast: [
      {
        actor: { id: 'a1', fullName: 'Tom Cruise' },
        character: 'Cage',
      },
      {
        actor: { id: 'a2', fullName: 'Emily Blunt' },
        character: 'Rita Vrataski',
      },
    ],
    likes: ['userid1', 'userid2'],
    dislikes: ['userid1', 'userid2'],
  },
  {
    id: '2',
    title: 'Interstellar',
    genre: ['Drama', 'Sci-Fi'],
    year: '2014',
    rating: 8.6,
    descritption:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    type: 'Movie',
    trailer_urls: ['https://www.youtube.com/watch?v=zSWdZVtXT7E'],
    images: [],
    age_rating: 'PG-13',
    poster: 'https://placehold.co/200x300?text=Interstellar',
    poster_bg: 'https://placehold.co/800x450?text=Interstellar+BG',
    director: [
      {
        director: { id: 'd2', fullName: 'Christopher Nolan' },
      },
    ],
    cast: [
      {
        actor: { id: 'a3', fullName: 'Matthew McConaughey' },
        character: 'Cooper',
      },
      {
        actor: { id: 'a4', fullName: 'Anne Hathaway' },
        character: 'Brand',
      },
    ],
    likes: ['userid1', 'userid2'],
    dislikes: ['userid1', 'userid2'],
  },
  {
    id: '3',
    title: 'The Dark Knight',
    genre: ['Action', 'Crime', 'Drama'],
    year: '2008',
    rating: 9.0,
    descritption:
      'Batman faces the Joker, a criminal mastermind who wants to see the world burn.',
    type: 'Movie',
    trailer_urls: ['https://www.youtube.com/watch?v=EXeTwQWrcwY'],
    images: [],
    age_rating: 'PG-13',
    poster: 'https://placehold.co/200x300?text=The+Dark+Knight',
    poster_bg: 'https://placehold.co/800x450?text=The+Dark+Knight+BG',
    director: [
      {
        director: { id: 'd2', fullName: 'Christopher Nolan' },
      },
    ],
    cast: [
      {
        actor: { id: 'a5', fullName: 'Christian Bale' },
        character: 'Bruce Wayne / Batman',
      },
      {
        actor: { id: 'a6', fullName: 'Heath Ledger' },
        character: 'Joker',
      },
    ],
    likes: ['userid1', 'userid2'],
    dislikes: ['userid1', 'userid2'],
  },
  {
    id: '4',
    title: 'Inception',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    year: '2010',
    rating: 8.8,
    descritption:
      'A thief who steals corporate secrets through dream-sharing technology is given an inverse task: planting an idea.',
    type: 'Movie',
    trailer_urls: ['https://www.youtube.com/watch?v=YoHD9XEInc0'],
    images: [],
    age_rating: 'PG-13',
    poster: 'https://placehold.co/200x300?text=Inception',
    poster_bg: 'https://placehold.co/800x450?text=Inception+BG',
    director: [
      {
        director: { id: 'd2', fullName: 'Christopher Nolan' },
      },
    ],
    cast: [
      {
        actor: { id: 'a7', fullName: 'Leonardo DiCaprio' },
        character: 'Cobb',
      },
      {
        actor: { id: 'a8', fullName: 'Joseph Gordon-Levitt' },
        character: 'Arthur',
      },
    ],
    likes: ['userid1', 'userid2'],
    dislikes: ['userid1', 'userid2'],
  },
  {
    id: '5',
    title: 'Parasite',
    genre: ['Thriller', 'Drama'],
    year: '2019',
    rating: 8.6,
    descritption:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    type: 'Movie',
    trailer_urls: ['https://www.youtube.com/watch?v=5xH0HfJHsaY'],
    images: [],
    age_rating: 'R',
    poster: 'https://placehold.co/200x300?text=Parasite',
    poster_bg: 'https://placehold.co/800x450?text=Parasite+BG',
    director: [
      {
        director: { id: 'd3', fullName: 'Bong Joon-ho' },
      },
    ],
    cast: [
      {
        actor: { id: 'a9', fullName: 'Song Kang-ho' },
        character: 'Kim Ki-taek',
      },
      {
        actor: { id: 'a10', fullName: 'Lee Sun-kyun' },
        character: 'Park Dong-ik',
      },
    ],
    likes: ['userid1', 'userid2'],
    dislikes: ['userid1', 'userid2'],
  },
];
