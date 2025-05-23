"use client"; /* eslint-disable @next/next/no-img-element */
import { useMovieContext } from "@/context/movieContext";
import {
  MovieCardContextType,
  MovieContextType,
  sideBarContextType,
} from "@/interfaces/interfaces";
import { insertMovies } from "@/service/movieService";
// import { CardMovieProps } from "@/types/componentTypes";
import MovieCard from "./movieCard";
import { useCardContext } from "@/context/movieCardContext";
import Pagination from "./pagination";
import { useSideBarContext } from "@/context/sideBarContext";
import { useEffect } from "react";
import { getMoviesFromDb } from "@/utils/moviesAPI";

const CardMovie: React.FC = () => {
  const { movies, handleMovies, searchMovies, handleSearchMovies } =
    useMovieContext() as MovieContextType;
  const { currentPage } = useCardContext() as MovieCardContextType;
  const { sideBar } = useSideBarContext() as sideBarContextType;

  useEffect(() => {
    const syncMovies = async () => {
      const response = await getMoviesFromDb("movies", "/");
      const dbMovies = response?.data?.allMovies ?? [];

      const hasMoviesForPage = dbMovies.some(
        (movie: any) => movie.page === currentPage
      );

      if (!hasMoviesForPage) {
        await insertMovies(currentPage);
      }

      handleMovies(dbMovies);
    };

    syncMovies();
  }, [currentPage]);

  useEffect(() => {
    if (movies) handleSearchMovies(movies);
  }, [movies]);

  const itemsPerPage = 30;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToShow = searchMovies?.slice(startIndex, endIndex);

  return (
    <article className={`${sideBar ? "xl:w-[100%]" : ""} w-full`}>
      <section
        className={`flex w-full justify-center transition-all ease-in-out duration-300 ${
          sideBar ? "max-xl:mt-[300px] xl:w-[75%] xl:translate-x-[32.5%] 2xl:translate-x-[30%] 3xl:translate-x-[27.5%]" : null
        } `}
      >
        <section className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 justify-items-center w-full max-w-[1600px] ${sideBar ? "xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5" : "mx-auto"} mt-20`}>
          {moviesToShow &&
            moviesToShow.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </section>
      </section>
      <div>
        <Pagination />
      </div>
    </article>
  );
};

export default CardMovie;
