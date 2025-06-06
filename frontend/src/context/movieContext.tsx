import { createContext, useCallback, useContext, useState } from "react";
import { TMovie } from "../types/movieTypes";
import { MovieContextType } from "@/interfaces/interfaces";

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<TMovie[] | undefined>(undefined);
  const [searchMovies, setSearchMovies] = useState<TMovie[] | undefined>(
    undefined
  );
  const [searchMyMovies, setSearchMyMovies] = useState<TMovie[] | undefined>(
    undefined
  );

  const handleMovies = useCallback((newMovies: TMovie[] | undefined) => {
    if (!newMovies) return;
    setMovies((prevMovies) => {
      if (!prevMovies) return newMovies;
      const existingIds = new Set(prevMovies.map((m) => m.id));
      const filtered = newMovies.filter((m) => !existingIds.has(m.id));
      return [...prevMovies, ...filtered];
    });
  }, []);

  const handleSearchMovies = useCallback((movies: TMovie[] | undefined) => {
    setSearchMovies(movies);
  }, []);

  const handleSearchMyMovies = useCallback((movies: TMovie[] | undefined) => {
    setSearchMyMovies(movies);
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movies,
        handleMovies,
        searchMovies,
        handleSearchMovies,
        searchMyMovies,
        handleSearchMyMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
