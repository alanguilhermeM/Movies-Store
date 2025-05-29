"use client"
import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "@/context/userContext";
import { MovieCardContextType, MovieContextType, UserContextType } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/utils/formHandlers";
import Link from "next/link";
import { useMovieContext } from "@/context/movieContext";
import { useCardContext } from "@/context/movieCardContext";

const Form: React.FC = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [userExist, setUserExist] = useState(true);
  const { handleUser } = useUserContext() as UserContextType;
  const router = useRouter();
  const { handleMovies } = useMovieContext() as MovieContextType;
  const { currentPage } = useCardContext() as MovieCardContextType;

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, {
          passwordRef,
          emailRef,
          setUserExist,
          handleUser,
          router,
          handleMovies,
          currentPage,
        })
      }
      className="flex flex-col justify-center items-center w-full bg-white h-full lg:h-4/6 lg:rounded-xl text-2xl text-gray-600 drop-shadow-2xl"
    >
      <h1 className="relative bottom-10 text-4xl">Sign In</h1>
      <label htmlFor="email" className="relative w-5/6 text-lg py-2">
        Email
      </label>
      <input
        id="email"
        placeholder="Digite seu email..."
        name="email"
        ref={emailRef}
        required
        className="relative pl-4 py-4 w-5/6 rounded-lg bg-gray-100"
      />

      <label
        htmlFor="password"
        className="relative w-5/6 text-lg py-2"
      >
        Password
      </label>
      <input
        id="password"
        placeholder="Digite sua senha..."
        type="password"
        name="password"
        ref={passwordRef}
        required
        className="relative pl-4 py-4 w-5/6 rounded-lg bg-gray-100"
      />

      <p className="relative top-4 text-base">Não tem uma conta? <Link className="font-bold" href={'/register'}>Cadastre-se</Link></p>
      {userExist ? null : (
        <div
          role="alert"
          className="text-red-600 text-sm relative top-10 animate-bounce"
        >
          Usuario não encontrado, verifique seus dados!
        </div>
      )}
      <button
        type="submit"
        className="relative bg-gray-800 text-white py-2 w-5/6 rounded-xl hover:scale-105 top-12 transition-all"
      >
        Sign in
      </button>
    </form>
  );
};

export default Form;
