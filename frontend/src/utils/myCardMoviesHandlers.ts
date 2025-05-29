import { TMovie } from "@/types/movieTypes";
import { Dispatch, SetStateAction } from "react";
import { getRentedMovies } from "./cardMovieHandlers";
import { api } from "@/service/api";

export const handleRemoveRent = async (
  movie: TMovie,
  setMyMovies: Dispatch<SetStateAction<TMovie[] | undefined>>
) => {
  const local = localStorage.getItem("User");
  if (local) {
    const User = JSON.parse(local);
    const data = { userId: User.id, movieId: movie.id };
    await api.delete("/movieRent", { data });

    const rentedMovies = await getRentedMovies();
    if (movie.id) {
      const index = rentedMovies.indexOf(movie.id);
      rentedMovies.splice(index, 1);
      localStorage.setItem("rentedMovies", JSON.stringify(rentedMovies));
    }

    setMyMovies((prevMovies) =>
      prevMovies?.filter((prevMovie) => prevMovie.id !== movie.id)
    );
  }
};
