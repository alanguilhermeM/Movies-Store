"use client"
/* eslint-disable @next/next/no-img-element */
import {
  getRentedMovies,
  handleMouseEnter,
  handleMouseLeave,
  handleRent,
} from "@/utils/handlers";
import { IMAGE_PATH } from "@/utils/moviesAPI";
import { useCardContext } from "@/context/movieCardContext";
import { MovieCardContextType, MovieCardProps } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { setHoveredMovie, hoveredMovie, setLoginState, loading, setLoading } =
    useCardContext() as MovieCardContextType;

  const [user, setUser] = useState<string | null>(null);
  const [isRented, setIsRented] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("User");
      if (!storedUser) return;
  
      setUser(storedUser);
  
      try {
        const rentedMovies = await getRentedMovies();
        if (rentedMovies && movie.id) {
          setIsRented(rentedMovies.includes(movie.id));
        }
      } catch (error) {
        console.error("Erro ao carregar filmes alugados:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [movie.id]);

  if (loading) return null;

  return (
    <section
      className="flex-col max-sm:min-w-[150px] max-sm:max-w-[200px] max-sm:w-[90%] ss:h-full md:w-[15rem] md:h-[30rem] justify-center md:mx-0 hover:scale-105 transition-all relative"

      onMouseEnter={() => handleMouseEnter(movie, setHoveredMovie)}
      onMouseLeave={() => handleMouseLeave(setHoveredMovie)}
    >
      <img
        src={`${IMAGE_PATH}${movie.image_path}`}
        alt={`${movie.title} poster`}
        className="border-solid border-0 rounded-t-xl w-[100%] h-[75%]"
        style={{
          filter: hoveredMovie === movie ? "brightness(75%)" : "brightness(100%)",
          transition: "filter 0.3s",
        }}
      />
      <section className="flex justify-center h-1/5">
        <main className="flex flex-col justify-center items-center bg-black w-full h-full text-white border-solid border-0 rounded-b-xl text-center">
          <h2
            className="relative bottom-2 text-lg w-full truncate"
            style={{
              fontSize: "clamp(0.8rem, 1vw, 1rem)",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <p className="inline-block hover:animate-slide max-sm:mt-1 overflow-hidden">
              {movie.title}
            </p>
          </h2>
          <button
            className={`w-[90%] ${
              isRented ? "bg-gray-700" : "bg-gray-800"
            } p-2 max-sm:mb-1 rounded-lg hover:scale-105 transition-all`}
            onClick={() => {
              handleRent(movie, setLoginState, () => setIsRented(true));
            }}
            disabled={isRented}
          >
            {isRented ? "Alugado" : "Alugar"}
          </button>
        </main>
      </section>
      {hoveredMovie === movie && (
        <section className="h-[75%] absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white rounded-t-xl">
          <div className="flex items-center text-center overflow-y-auto h-[75%]">
            <p className="text-base font-semibold">{movie.description}</p>
          </div>
        </section>
      )}
    </section>
  );
};

export default MovieCard;
