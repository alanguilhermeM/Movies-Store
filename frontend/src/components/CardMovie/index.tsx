"use client"; /* eslint-disable @next/next/no-img-element */
import { useMovieContext } from "@/context/movieContext";
import {
  MovieCardContextType,
  MovieContextType,
  sideBarContextType,
} from "@/interfaces/interfaces";
import MovieCard from "./movieCard";
import { useCardContext } from "@/context/movieCardContext";
import Pagination from "./pagination";
import { useSideBarContext } from "@/context/sideBarContext";
import { useEffect } from "react";
import { syncMovies } from "@/utils/formHandlers";

const CardMovie: React.FC = () => {
  const { movies, handleMovies, searchMovies, handleSearchMovies } =
    useMovieContext() as MovieContextType;
  const { currentPage } = useCardContext() as MovieCardContextType;
  const { sideBar } = useSideBarContext() as sideBarContextType;
  
  useEffect(() => {
    const loadMovies = async () => {
      await syncMovies(currentPage, handleMovies);
    };
  
    loadMovies();
  }, [currentPage])

  useEffect(() => {
    if (movies) handleSearchMovies(movies);
  }, [movies]);

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToShow = searchMovies?.slice(startIndex, endIndex) ?? [];

  return (
    <article className={`${sideBar ? "xl:w-[100%]" : ""} w-full`}>
      <section
        className={`flex w-full justify-center transition-all ease-in-out duration-300 ${
          sideBar ? "max-xl:mt-[300px] xl:w-[75%] xl:translate-x-[32.5%] 2xl:translate-x-[30%] 3xl:translate-x-[27.5%]" : ""
        } `}
      >
        <section className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center w-full max-w-[1600px] ${sideBar ? "xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5" : "2xl:grid-cols-5 3xl:grid-cols-6"} mt-20`}>
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
