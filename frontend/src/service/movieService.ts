import { api } from "@/service/api";
import { TMovie } from "@/types/movieTypes";
import { getMovies, getMoviesFromDb } from "@/utils/moviesAPI";
import { Dispatch, SetStateAction } from "react";

const getAllMoviesFromDb = async (currentRoute: string, handleMovies: (movies: TMovie[]) => void) => {
  const response = await getMoviesFromDb("movies", currentRoute);
  if (response?.status === 200 && response.data) {
    handleMovies(response.data.allMovies);
  }
};

const insertMovies = async (page: number) => {
  try {
    const data = await getMovies(page);
    
    if (data.movies.length === 0) return;

    const promises = data.movies.map(async (movie) => {
      const { title, overview, release_date, poster_path, page } = movie;

      if (!title || !release_date || !poster_path) {
        console.log(`Filme inválido ignorado: ${title}`);
        return;
      }

      try {
        await api.post("/movie", {
          title,
          release_date,
          description: overview,
          image_path: poster_path,
          page,
        });
      } catch (err) {
        console.error(`Erro ao inserir o filme "${title}":`, err);
      }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error("Erro ao inserir filmes:", error);
  }
};


const getMoviesRentFromDb = async (currentRoute: string, setMyMovies: Dispatch<SetStateAction<TMovie[] | undefined>>) => {
  const response = await getMoviesFromDb('moviesRentByUser', currentRoute)
  if (response?.status === 200 && response.data) {
    const moviesRent = response?.data.moviesRent
    const moviesArray = moviesRent.map((item: any) => item.movie);
    setMyMovies(moviesArray);
  }
}

export {
    getAllMoviesFromDb,
    insertMovies,
    getMoviesRentFromDb,
}