"use client";
import { useMovieContext } from "@/context/movieContext";
import {
  MovieContextType,
  MyMovieCardContextType,
  sideBarContextType,
} from "@/interfaces/interfaces";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import MyMovieCard from "./myMovieCard";
import { useMyCardContext } from "@/context/myMovieCardContext";
import { getMoviesRentFromDb } from "@/service/movieService";
import { useSideBarContext } from "@/context/sideBarContext";

const MyMovies: React.FC = () => {
  const { searchMyMovies, handleSearchMyMovies } =
    useMovieContext() as MovieContextType;
  const { myMovies, setMyMovies } =
    useMyCardContext() as MyMovieCardContextType;
  const { sideBar } = useSideBarContext() as sideBarContextType;

  const currentRoute = usePathname();

  useEffect(() => {
    getMoviesRentFromDb(currentRoute, setMyMovies);
  }, []);

  useEffect(() => {
    if (myMovies) {
      handleSearchMyMovies(myMovies);
    }
  }, [myMovies]);

  return (
    <article
      className={`flex w-full min-h-screen justify-center transition-all ease-in-out duration-300 ${
        sideBar
          ? "max-xl:mt-[300px] xl:w-[75%] xl:translate-x-[32.5%] 2xl:translate-x-[30%] 3xl:translate-x-[27%]"
          : null
      } `}
    >
      <section className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 = justify-items-center w-full max-w-[1600px] ${sideBar ? "xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5" : "2xl:grid-cols-5 3xl:grid-cols-6 mx-auto"} mt-20`}>
        {searchMyMovies &&
          searchMyMovies.map((movie) => (
            <MyMovieCard key={movie.id} movie={movie} />
          ))}
      </section>
    </article>
  );
};

export default MyMovies;
