/* eslint-disable @next/next/no-img-element */
import {
  handleMouseEnter,
  handleMouseLeave,
  handleRemoveRent,
} from "@/utils/handlers";
import { IMAGE_PATH } from "@/utils/moviesAPI";
import { useCardContext } from "@/context/movieCardContext";
import {
  MovieCardContextType,
  MovieCardProps,
  MyMovieCardContextType,
} from "@/interfaces/interfaces";
import { useMyCardContext } from "@/context/myMovieCardContext";

const MyMovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { setHoveredMovie, hoveredMovie } =
    useCardContext() as MovieCardContextType;

  const { setMyMovies } = useMyCardContext() as MyMovieCardContextType;
  return (
    <section
      className="flex-col max-sm:min-w-[150px] max-sm:max-w-[200px] max-sm:w-[90%] ss:h-full md:w-[15rem] md:h-[30rem] justify-center md:mx-0 hover:scale-105 transition-all relative"
      key={movie.id}
      onMouseEnter={() => handleMouseEnter(movie, setHoveredMovie)}
      onMouseLeave={() => handleMouseLeave(setHoveredMovie)}
    >
      <img
        src={`${IMAGE_PATH}${movie.image_path}`}
        alt={`${movie.title} poster`}
        width={240}
        className="border-solid border-0 rounded-t-xl w-[100%] h-[75%]"
        style={{
          filter:
            hoveredMovie === movie ? "brightness(75%)" : "brightness(100%)",
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
            <span className="inline-block max-sm:mt-1 hover:animate-slide overflow-hidden">{movie.title}</span>
          </h2>
          <button
            className="w-[90%] bg-gray-800 p-2 rounded-lg max-sm:mb-1 hover:scale-105 transition-all"
            onClick={() => handleRemoveRent(movie, setMyMovies)}
          >
            Remove
          </button>
        </main>
      </section>
      {hoveredMovie === movie && (
        <div className="h-[75%] absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 text-white rounded-t-xl custom-scrollbar">
          <div className="flex items-center text-center overflow-y-auto h-[75%]">
            <p className="text-base font-semibold">{movie.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyMovieCard;
