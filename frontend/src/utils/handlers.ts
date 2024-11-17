import { Dispatch, FormEvent, MouseEventHandler, SetStateAction } from "react";
import { api } from "@/service/api";
import {
  HandlePageData,
  HandleSubmitData,
} from "@/interfaces/handlersInterfaces";
import { TMovie } from "@/types/movieTypes";

// Component Form
async function handleSubmit(e: FormEvent, data: HandleSubmitData) {
  e.preventDefault();
  const { emailRef, nameRef, handleUser, setUserExist, router } = data;

  const email = emailRef.current?.value;
  const name = nameRef.current?.value;

  try {
    const response = await api.get(`/user/${email}`);

    if (response.status === 200 && response.data.User.name === name) {
      handleUser(response.data.User);
      router.push("/");
    } else {
      setUserExist(false);
    }
  } catch (error) {
    console.error("Erro ao enviar requisição:", error);
    setUserExist(false);
  }
}

// CardMovie Component
const handleRent = async (
  movie: TMovie,
  setIsLogged: Dispatch<SetStateAction<(string | boolean)[]>>
) => {
  const isLogged = localStorage.getItem("User");

  if (isLogged) {
    setIsLogged([`${movie.title}`, true]);
    const userId = JSON.parse(isLogged);

    try {
      await api.post("/movieRent", {
        userId: userId.id,
        movieId: movie.id,
      });

      window.alert("Filme Alugado");
    } catch (error) {
      console.log("Precisa estar conectado a uma conta");
    }
    return;
  } else {
    window.alert("Você deve se conectar a uma conta!");
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

const handleMouseEnter = (movie: TMovie, setHoveredMovie: (movie: TMovie | null) => void) => {
  setHoveredMovie(movie);
};

const handleMouseLeave = (setHoveredMovie: (movie: TMovie | null) => void) => {
  setHoveredMovie(null);
};

export { handleSubmit, handleRent, handlePage, handleMouseEnter, handleMouseLeave };
