/* eslint-disable @next/next/no-img-element */
import { useUseContext } from "@/context/movieContext";
import { MovieCardContextType, MovieContextType } from "@/interfaces/interfaces";
import { getAllMoviesFromDb, insertMovies } from "@/service/movieService";
import { CardMovieProps } from "@/types/componentTypes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MovieCard from "./movieCard";
import { useCardContext } from "@/context/movieCardContext";
import Pagination from "./pagination";

const CardMovie: React.FC<CardMovieProps> = ({ sideBarOn }) => {
  const { movies, handleMovies, searchMovies, handleSearchMovies } =
    useUseContext() as MovieContextType;

  const { loginState, currentPage } = useCardContext() as MovieCardContextType;
  
  const router = useRouter();
  const currentRoute = router.asPath;

  useEffect(() => {
    insertMovies(currentPage);
    getAllMoviesFromDb(currentRoute, handleMovies);
  }, [currentPage]);

  useEffect(() => {
    if (movies) handleSearchMovies(movies);
  }, [movies]);

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToShow = searchMovies?.slice(startIndex, endIndex);

  return (
    <article>
      <section className={`flex ${sideBarOn ? "justify-end" : "justify-center"}`}>
        <section className="flex flex-wrap relative justify-center w-5/6 mt-20">
          {moviesToShow &&
            moviesToShow.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          {loginState[1] ? <p>Filme {loginState[0]} alugado</p> : null}
        </section>
      </section>
      <Pagination />
    </article>
  );
};

export default CardMovie;
