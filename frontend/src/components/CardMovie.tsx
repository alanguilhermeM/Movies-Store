/* eslint-disable @next/next/no-img-element */
import { useUseContext } from "@/context/movieContext";
import { MovieContextType } from "@/interfaces/interfaces";
import { api } from "@/service/api";
import { CardMovieProps } from "@/types/componentTypes";
import { TMovie } from "@/types/movieTypes";
import { IMAGE_PATH, getMovies, getMoviesFromDb } from "@/utils/moviesAPI";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";

const CardMovie: React.FC<CardMovieProps> = ({ sideBarOn }) => {
  const { movies, handleMovies, searchMovies, handleSearchMovies } =
    useUseContext() as MovieContextType;
  const [isLoggedIn, setIsLogged] = useState(["", false]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredMovie, setHoveredMovie] = useState<TMovie | null>(null);
  const router = useRouter();
  const currentRoute = router.asPath;

  useEffect(() => {
    insertMovies(currentPage);
    getAllMoviesFromDb();
  }, [currentPage]);

  useEffect(() => {
    if (movies) handleSearchMovies(movies);
  }, [movies]);

  const getAllMoviesFromDb = async () => {
    const response = await getMoviesFromDb("movies", currentRoute);
    if (response?.status === 200 && response.data) {
      handleMovies(response.data.allMovies);
    }
  };

  const insertMovies = async (page: number) => {
    try {
      const data = await getMovies(page);
      if (data.length > 0) {
        const promises = data.map(async (movie) => {
          const { title, overview, release_date, poster_path, page } = movie;
          await api.post("/movie", {
            title,
            release_date,
            description: overview,
            image_path: poster_path,
            page,
          });
        });
        await Promise.all(promises);
      }
    } catch (error) {
      console.error("Erro ao inserir filmes:", error);
    }
  };

  const handleRent = async (movie: TMovie) => {
    const isLogged = localStorage.getItem("User");
    if (isLogged) {
      setIsLogged([`${movie.title}`, true]);
      const userId = JSON.parse(isLogged);

      try {
        await api.post("/movieRent", {
          userId: userId.id,
          movieId: movie.id,
        });

        window.alert('Filme Alugado')
      } catch (error) {
        console.log("Precisa estar conectado a uma conta");
      }
      return;
    } else {
      window.alert("Você deve se conectar a uma conta!");
    }
  };

  const handlePage: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;
    if (value === "Next") {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMouseEnter = (movie: TMovie) => {
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToShow = searchMovies?.slice(startIndex, endIndex);

  return (
    <>
      {sideBarOn ? (
        <div className="flex justify-end">
          <div className="flex flex-wrap relative justify-center w-5/6 mt-20">
            {moviesToShow &&
              moviesToShow.map((movie) => (
                <section
                  className="flex-col w-[15rem] h-[30rem] justify-center mr-8 ml-8 hover:scale-105 transition-all relative"
                  key={movie.id}
                  onMouseEnter={() => handleMouseEnter(movie)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={`${IMAGE_PATH}${movie.image_path}`}
                    alt="poster"
                    width={240}
                    className="border-solid border-0 rounded-t-xl"
                    style={{
                      filter:
                        hoveredMovie === movie
                          ? "brightness(75%)"
                          : "brightness(100%)",
                      transition: "filter 0.3s",
                      borderRadius: '12px 12px 0 0'
                    }}
                  />
                  <div className="flex justify-center h-1/5">
                    <div className="flex flex-col justify-center items-center bg-black w-full h-full text-white border-solid border-0 rounded-b-xl text-center">
                      <h1 className="relative bottom-2 text-lg">
                        {movie.title}
                      </h1>
                      <button
                        className="w-5/6 bg-gray-800 p-2 rounded-lg hover:scale-105 transition-all"
                        onClick={() => handleRent(movie)}
                      >
                        Alugar
                      </button>
                    </div>
                  </div>
                  {hoveredMovie === movie && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white h-[25.5rem] rounded-xl">
                      <div className="text-center">
                        <p className="text-base font-semibold">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            {isLoggedIn[1] ? <p>Filme {isLoggedIn[0]} alugado</p> : null}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-wrap relative justify-center w-5/6 mt-20">
            {moviesToShow &&
              moviesToShow.map((movie) => (
                <section
                  className="flex-col w-[15rem] h-[30rem] justify-center mr-8 ml-8 hover:scale-105 transition-all relative"
                  key={movie.id}
                  onMouseEnter={() => handleMouseEnter(movie)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={`${IMAGE_PATH}${movie.image_path}`}
                    alt="poster"
                    width={240}
                    className="border-solid border-0 rounded-t-xl"
                    style={{
                      filter:
                        hoveredMovie === movie
                          ? "brightness(75%)"
                          : "brightness(100%)",
                      transition: "filter 0.3s",
                      borderRadius: '12px 12px 0 0'
                    }}
                  />
                  <div className="flex justify-center h-1/5">
                    <div className="flex flex-col justify-center items-center bg-black w-full h-full text-white border-solid border-0 rounded-b-xl text-center">
                      <h1 className="relative bottom-2 text-lg">
                        {movie.title}
                      </h1>
                      <button
                        className="w-5/6 bg-gray-800 p-2 rounded-lg hover:scale-105 transition-all"
                        onClick={() => handleRent(movie)}
                      >
                        Alugar
                      </button>
                    </div>
                  </div>
                  {hoveredMovie === movie && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white h-[25.5rem] rounded-xl">
                      <div className="text-center">
                        <p className="text-base font-semibold">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            {isLoggedIn[1] ? <p>Filme {isLoggedIn[0]} alugado</p> : null}
          </div>
        </div>
      )}
      {currentPage === 1 ? (
        <div className="flex justify-center items-center relative top-7">
          <button
            onClick={handlePage}
            value="Next"
            className="bg-gray-800 text-white rounded-lg p-2 hover:scale-105 transition-all"
          >
            Next Page
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center relative top-7">
          <button
            onClick={handlePage}
            value="Previous"
            className="mr-4 ml-4 bg-gray-800 text-white rounded-lg p-2 hover:scale-105 transition-all"
          >
            Previous Page
          </button>
          <button
            onClick={handlePage}
            value="Next"
            className="mr-4 ml-4 bg-gray-800 text-white rounded-lg p-2 hover:scale-105 transition-all"
          >
            Next Page
          </button>
        </div>
      )}
    </>
  );
};

export default CardMovie;
