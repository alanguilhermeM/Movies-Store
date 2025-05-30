// import { api } from "@/service/api";

import { api } from "@/service/api";

const API_KEY = "c0c02132ffe3677c036b889597f0bdc0";
export const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

export const getMovies = async (page: number): Promise<{
  movies: {
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    page: number;
  }[],
  total_pages: number
}> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();

    const movies = data.results.map((movie: any) => ({
      title: movie.title,
      release_date: movie.release_date,
      overview: movie.overview,
      poster_path: movie.poster_path,
      page: data.page,
    }));

    return { movies, total_pages: data.total_pages };
  } catch (error) {
    console.error(error);
    return { movies: [], total_pages: 1 };
  }
};

export const getMoviesFromDb = async (path: string, rota: string) => {
  if (rota === "/myMovies") {
    const local = localStorage.getItem("User");
    if (local) {
      const { id } = JSON.parse(local);
      try {
        const response = await api.get(`/${path}/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    try {
      const response = await api.get(`/${path}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
