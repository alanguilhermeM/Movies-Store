import axios from "axios";
import bcrypt from "bcryptjs";
import { TUser } from "@/types/userTypes";
import { getMoviesFromDb } from "@/utils/moviesAPI";
import { insertMovies } from "@/service/movieService";
import { HandleSubmitData } from "@/interfaces/handlersInterfaces";
import { getSession, signIn } from "next-auth/react";
import { TMovie } from "@/types/movieTypes";
import { FormEvent } from "react";
import { api } from "@/service/api";

const syncMovies = async (
  currentPage: number,
  handleMovies: (movies: TMovie[]) => void
) => {
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

const gSubmit2 = async (session: any, handleUser: (user: TUser) => void) => {
  const { email, image, name } = session.user;

  if (!email || !name || !image) {
    throw new Error("Dados do usuário estão incompletos.");
  }

  const password = Math.random().toString(36).slice(-8);
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
  try {
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na requisição:", error.response?.data);
    } else {
      console.error("Erro inesperado:", error);
    }
  }
};

export { syncMovies, handleSubmit, gSubmit, gSubmit2 };
