/* eslint-disable @next/next/no-img-element */
import { useUseContext } from "@/context/movieContext";
import { MovieContextType } from "@/interfaces/interfaces";
import { api } from "@/service/api";
import { CardMovieProps } from "@/types/componentTypes";
import { TMovie } from "@/types/movieTypes";
import { IMAGE_PATH, getMoviesFromDb } from "@/utils/moviesAPI";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const MyMoviesCard: React.FC<CardMovieProps> = ({ sideBarOn }) => {
  const { searchMyMovies, handleSearchMyMovies } = useUseContext() as MovieContextType;
  const [myMovies, setMyMovies] = useState<TMovie[] | undefined >(undefined);
  const router = useRouter();
  const currentRoute = router.asPath;
  const [hoveredMovie, setHoveredMovie] = useState<TMovie | null>(null);

  useEffect(() => {
    getMoviesRentFromDb();
  }, []);

  useEffect(() => {
    if (myMovies) {
      handleSearchMyMovies(myMovies);
    }
  }, [myMovies, handleSearchMyMovies]);

  const getMoviesRentFromDb = async () => {
    const response = await getMoviesFromDb('moviesRentByUser', currentRoute)
    if (response?.status === 200 && response.data) {
      const moviesRent = response?.data.moviesRent
      const moviesArray = moviesRent.map((item: any) => item.movie); // Extrair apenas os filmes
      setMyMovies(moviesArray);
    }
  }

  const handleRemoveRent = async (movie: TMovie) => {
    const local = localStorage.getItem("User");
    if (local) {
      const User = JSON.parse(local);
      const data = {userId: User.id, movieId: movie.id}
      await api.delete('/movieRent', { data })
      
      setMyMovies(prevMovies => prevMovies?.filter(prevMovie => prevMovie.id !== movie.id));
    }
  }

  const handleMouseEnter = (movie: TMovie) => {
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };


  return (
    <>
      {sideBarOn ? (
        <div className="flex justify-end">
          <div className="flex flex-wrap relative justify-center w-5/6 mt-20">
            {searchMyMovies &&
            searchMyMovies.map((movie) => (
                <section
                  className="flex-col w-[15rem] h-[30rem] justify-center mr-8 ml-8 hover:scale-105 transition-all"
                  key={movie.id}
                  onMouseEnter={() => handleMouseEnter(movie)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={`${IMAGE_PATH}${movie.image_path}`}
                    alt="poster"
                    width={240}
                    className="border-solid border-0 rounded-t-xl"
                    style={{ filter: hoveredMovie === movie ? 'brightness(75%)' : 'brightness(100%)', transition: 'filter 0.3s', borderRadius: '12px', }}
                  />
                  <div className="flex justify-center h-1/5">
                    <div className="flex flex-col justify-center items-center bg-black w-full h-full text-white border-solid border-0 rounded-b-xl text-center">
                        <h1 className="relative bottom-2 text-lg">{movie.title}</h1>
                        <button className="w-5/6 bg-gray-800 p-2 rounded-lg hover:scale-105 transition-all" onClick={() => handleRemoveRent(movie)}>Remove</button>
                    </div>
                  </div>
                  {hoveredMovie === movie && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white h-[25.5rem]">
                      <div className="text-center">
                        {/* <h1 className="text-2xl relative bottom-16">{movie.title}</h1> */}
                        <p className="text-base font-semibold">{movie.description}</p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-wrap relative justify-center w-5/6 mt-20">
            {searchMyMovies &&
              searchMyMovies.map((movie) => (
                <section
                  className="flex-col w-[15rem] h-[30rem] justify-center mr-8 ml-8 hover:scale-105 transition-all"
                  key={movie.id}
                  onMouseEnter={() => handleMouseEnter(movie)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={`${IMAGE_PATH}${movie.image_path}`}
                    alt="poster"
                    width={240}
                    className="border-solid border-0 rounded-t-xl"
                    style={{ filter: hoveredMovie === movie ? 'brightness(75%)' : 'brightness(100%)', transition: 'filter 0.3s' }}
                  />
                  <div className="flex justify-center h-1/5">
                    <div className="flex flex-col justify-center items-center bg-black w-full h-full text-white border-solid border-0 rounded-b-xl text-center">
                        <h1 className="relative bottom-2 text-lg">{movie.title}</h1>
                        <button className="w-5/6 bg-gray-800 p-2 rounded-lg hover:scale-105 transition-all" onClick={() => handleRemoveRent(movie)}>Remove</button>
                    </div>
                  </div>
                  {hoveredMovie === movie && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white h-[25.5rem]">
                      <div className="text-center">
                        {/* <h1 className="text-2xl relative bottom-16">{movie.title}</h1> */}
                        <p className="text-base font-semibold">{movie.description}</p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyMoviesCard;
