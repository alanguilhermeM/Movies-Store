import { Dispatch, FormEvent, SetStateAction } from "react";
import { api } from "@/service/api";
import { HandlePageData } from "@/interfaces/handlersInterfaces";
import { TMovie } from "@/types/movieTypes";
import { getSession } from "next-auth/react";

const isUserLoggedIn = (): string | null => localStorage.getItem("User");

const getRentedMovies = async (): Promise<any> => {
  const moviesRented = JSON.parse(localStorage.getItem("rentedMovies") ?? "[]");
  const currentSession = await getSession();
  let user;
  if (currentSession?.user) user = currentSession.user;

  if (moviesRented.length === 0 && user) {
    const { data: UserDb } = await api.get(`/user/${user.email}`);

    const { data: moviesRentedFromDb } = await api.get(
      `/moviesRentByUser/${UserDb.User.id}`
    );
    const moviesId: number[] = moviesRentedFromDb.moviesRent.map(
      (movieRented: any) => movieRented.movieId
    );

    localStorage.setItem("rentedMovies", JSON.stringify(moviesId));

    return moviesId;
  }

  return moviesRented;
};

const addMovieToRented = async (movieId: number): Promise<number[]> => {
  const rentedMovies = await getRentedMovies();
  if (!rentedMovies.includes(movieId)) {
    const updatedMovies = [...rentedMovies, movieId];
    localStorage.setItem("rentedMovies", JSON.stringify(updatedMovies));
    return updatedMovies;
  }
  return rentedMovies;
};

const handleRent = async (
  movie: TMovie,
  setIsLogged: Dispatch<SetStateAction<(string | boolean)[]>>,
  setRented: any
) => {
  const user = isUserLoggedIn();

  if (!user) {
    alert("Você deve se conectar a uma conta!");
    return;
  }
  setIsLogged([`${movie.title}`, true]);

  if (movie.id) {
    const rentedMovies = await addMovieToRented(movie.id);
    setRented(rentedMovies.includes(movie.id));
  }

  const userId = JSON.parse(user);
  try {
    await api.post("/movieRent", {
      userId: userId.id,
      movieId: movie.id,
    });
  } catch (error) {
    console.log("Precisa estar conectado a uma conta");
  }
};

const handlePage = (e: FormEvent, data: HandlePageData) => {
  const { value } = e.currentTarget as HTMLInputElement;
  const { setCurrentPage, currentPage } = data;

  if (value === "Next") {
    setCurrentPage(currentPage + 1);
  } else {
    setCurrentPage(currentPage - 1);
  }
};

const handleMouseEnter = (
  movie: TMovie,
  setHoveredMovie: (movie: TMovie | null) => void
) => {
  setHoveredMovie(movie);
};

const handleMouseLeave = (setHoveredMovie: (movie: TMovie | null) => void) => {
  setHoveredMovie(null);
};

export {
  handleRent,
  handlePage,
  handleMouseEnter,
  handleMouseLeave,
  getRentedMovies,
};
