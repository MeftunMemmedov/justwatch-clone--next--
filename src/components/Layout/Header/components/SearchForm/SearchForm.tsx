'use client';
import { fetchList } from '@/api/helpers';
import Overlay from '@/components/Common/Overlay';
import { Movie } from '@/types';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

const SearchForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [movieResults, setMovieResults] = useState<Movie[]>([]);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  let debounceTimeout: NodeJS.Timeout;

  useEffect(() => {
    const storedSearches = localStorage.getItem('recent-search-list');
    setRecentSearches(storedSearches ? JSON.parse(storedSearches) : []);
  }, []);

  const getMoviesByTitle = async (title: string) => {
    if (!title.trim()) {
      setMovieResults([]);
      return;
    }
    try {
      const res = await fetchList<Movie[]>(
        `/Movies?title=ilike.*${title}*&limit=8`,
        false
      );
      setMovieResults(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      if (searchInput.trim()) {
        getMoviesByTitle(searchInput.trim());
      } else {
        setMovieResults([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsSearchActive(true);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchInput}`);
    setIsSearchActive(false);
    const updatedSearches = [...recentSearches, searchInput];
    setRecentSearches(updatedSearches);
    localStorage.setItem('recent-search-list', JSON.stringify(updatedSearches));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.setItem('recent-search-list', JSON.stringify([]));
  };

  return (
    <form
      className="relative flex w-full items-center gap-2 rounded px-3 py-1"
      onSubmit={handleSearchSubmit}
    >
      <IoIosSearch size={20} />
      <input
        type="search"
        className="sm:relative z-50 w-full text-white placeholder:text-gray-400 focus:outline-none"
        placeholder="Search for movies..."
        onChange={handleSearchChange}
        value={searchInput}
        onFocus={() => setIsSearchActive(true)}
        // onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
      />
      {isSearchActive ? (
        <div className=" bg-custom-slate2 absolute sm:w-full w-screen top-10 -right-2 z-80 p-5 lg:p-5 rounded-b-2xl">
          {searchInput == '' ? (
            <div>
              <div>
                {recentSearches.length > 0 ? (
                  <>
                    <div className="flex justify-between mb-4">
                      <h3 className="">Recent Searches</h3>
                      <button
                        className="font-semibold text-custom-slate1"
                        type="button"
                        onClick={clearRecentSearches}
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className="flex gap-2">
                      {recentSearches.map((word, index) => (
                        <li
                          key={index}
                          className="border rounded-sm py-1 px-3 flex items-center gap-2 cursor-pointer hover:bg-slate-500 hover:text-white transition-all"
                          onClick={() => {
                            setSearchInput(word);
                          }}
                        >
                          <IoIosSearch size={15} />
                          {word}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div>No Recent Searches</div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div className="flex justify-center py-5">
                  <CircularProgress />
                </div>
              ) : movieResults.length > 0 ? (
                <ul className="search-result-list overflow-y-auto max-h-[300px]">
                  {movieResults.map((movie) => (
                    <li key={movie.id}>
                      <Link
                        href={`/movies/${movie.id}`}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-800"
                        onClick={() => setIsSearchActive(false)}
                      >
                        <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded relative">
                          <Image
                            fill
                            src={movie?.poster}
                            alt={movie?.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-start font-medium text-white">
                            {movie?.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {movie?.year} •{' '}
                            {movie?.genres?.slice(0, 4).join(', ')}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No result</div>
              )}
            </div>
          )}
          {movieResults.length > 0 && !isLoading && (
            <div className="flex items-center justify-center border-t border-gray-800 py-4 flex-shrink-0">
              <Link
                href={{
                  pathname: '/search',
                  query: {
                    q: searchInput,
                  },
                }}
                className="text-lg font-semibold text-[#78a6b8] hover:text-gray-300"
                onClick={() => setIsSearchActive(false)}
              >
                See all results: {searchInput}
              </Link>
            </div>
          )}
        </div>
      ) : null}
      {isSearchActive && <Overlay close={() => setIsSearchActive(false)} />}
    </form>
  );
};

export default SearchForm;
