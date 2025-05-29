import { Dispatch, FormEvent, SetStateAction } from "react";
import { api } from "@/service/api";
import {
  HandlePageData,
  HandleSubmitData,
} from "@/interfaces/handlersInterfaces";
import { getMoviesFromDb } from "@/utils/moviesAPI";
import { insertMovies } from "@/service/movieService";
import { TMovie } from "@/types/movieTypes";
import { getSession, signIn } from "next-auth/react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { TUser } from "@/types/userTypes";

// Component Form
const syncMovies = async (currentPage: number, handleMovies: (movies: TMovie[]) => void) => {
  const response = await getMoviesFromDb("movies", "/");
  const dbMovies = response?.data?.allMovies ?? [];

  const hasMoviesForPage = dbMovies.some(
    (movie: any) => movie.page === currentPage
  );

  if (!hasMoviesForPage) {
    await insertMovies(currentPage);
    // Após inserir, atualiza os dados:
    const updated = await getMoviesFromDb("movies", "/");
    handleMovies(updated?.data?.allMovies ?? []);
  } else {
    handleMovies(dbMovies);
  }
};

async function handleSubmit(e: FormEvent, data: HandleSubmitData) {
  e.preventDefault();
  const {
    emailRef,
    passwordRef,
    handleUser,
    setUserExist,
    router,
    handleMovies,
    currentPage,
  } = data;

  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;

  try {
    const response = await api.get(`/user/${email}`);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    let passwordIsCorrect = false;
    if (password)
      passwordIsCorrect = await bcrypt.compare(
        password,
        response.data.User.password
      );

    if (
      response &&
      response.data.User.email === email &&
      result &&
      passwordIsCorrect
    ) {
      localStorage.setItem("User", JSON.stringify(response.data.User));
      handleUser(response.data.User);
      await syncMovies(currentPage, handleMovies);
     
      router.replace("/");
    } else {
      setUserExist(false);
    }
  } catch (error) {
    console.error("Erro ao enviar requisição:", error);
    setUserExist(false);
  }
}

const gSubmit = async (provider: string) => {
  await signIn(provider, { callbackUrl: "/" });
};

const gSubmit2 = async (handleUser: (user: TUser) => void) => {
  try {
    const waitForSession = async () => {
      let retries = 10;
      while (retries > 0) {
        const currentSession = await getSession();
        if (currentSession?.user) {
          console.log("Sessão encontrada:", currentSession);
          return currentSession;
        }
        retries--;
        console.log(`Tentativa restante: ${retries}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      throw new Error("A sessão não foi atualizada a tempo.");
    };

    const updatedSession = await waitForSession();
    const { email, image, name } = updatedSession?.user
      ? updatedSession.user
      : { email: null, image: null, name: null };

    if (!email || !name || !image) {
      throw new Error("Dados do usuário estão incompletos.");
    }

    const password = Math.random().toString(36).slice(-8); // Em produção, gerar com segurança
    const response = await api.get(`/user/${email}`);

    const user =
      response.status !== 200
        ? (
            await api.post("/user", {
              name,
              email,
              password,
              image_path: image,
            })
          ).data.User
        : response.data.User;

    localStorage.setItem("User", JSON.stringify(user));
    handleUser(user);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na requisição:", error.response?.data);
    } else {
      console.error("Erro inesperado:", error);
    }
  }
};

// CardMovie Component
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

// MyMovieCard COmponente

const handleRemoveRent = async (
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

export {
  syncMovies,
  handleSubmit,
  handleRent,
  handlePage,
  handleMouseEnter,
  handleMouseLeave,
  handleRemoveRent,
  gSubmit,
  gSubmit2,
  getRentedMovies,
};
