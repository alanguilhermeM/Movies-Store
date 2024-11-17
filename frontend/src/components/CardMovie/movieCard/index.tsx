/* eslint-disable @next/next/no-img-element */
import {
  handleMouseEnter,
  handleMouseLeave,
  handleRent,
} from "@/utils/handlers";
import { TMovie } from "@/types/movieTypes";
import { IMAGE_PATH } from "@/utils/moviesAPI";
import { Dispatch, SetStateAction } from "react";
import { useCardContext } from "@/context/movieCardContext";
import { MovieCardContextType, MovieCardProps } from "@/interfaces/interfaces";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { setHoveredMovie, hoveredMovie, setLoginState} = useCardContext() as MovieCardContextType;
  return (
    <section
      className="flex-col w-[15rem] h-[30rem] justify-center mr-8 ml-8 hover:scale-105 transition-all relative"
      key={movie.id}
      onMouseEnter={() => handleMouseEnter(movie, setHoveredMovie)}
      onMouseLeave={() => handleMouseLeave(setHoveredMovie)}
    >
      <img
        src={`${IMAGE_PATH}${movie.image_path}`}
        alt={`${movie.title} poster`}
        width={240}
        className="border-solid border-0 rounded-t-xl"
        style={{
          filter:
            hoveredMovie === movie ? "brightness(75%)" : "brightness(100%)",
          transition: "filter 0.3s",
          borderRadius: "12px 12px 0 0",
        }}
      />
      <section className="flex justify-center h-1/5">
        <main className="flex flex-col justify-center items-center bg-black w-full h-full text-white border-solid border-0 rounded-b-xl text-center">
          <h2 className="relative bottom-2 text-lg">{movie.title}</h2>
          <button
            className="w-5/6 bg-gray-800 p-2 rounded-lg hover:scale-105 transition-all"
            onClick={() => handleRent(movie, setLoginState)}
          >
            Alugar
          </button>
        </main>
      </section>
      {hoveredMovie === movie && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white h-[25.5rem] rounded-xl">
          <div className="text-center">
            <p className="text-base font-semibold">{movie.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MovieCard;
