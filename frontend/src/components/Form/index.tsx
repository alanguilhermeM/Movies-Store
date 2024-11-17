import React, { useRef, FormEvent, useState } from "react";
import { useUseContext } from "@/context/userContext";
import { UserContextType } from "@/interfaces/interfaces";
import { useRouter } from "next/router";
import { handleSubmit } from "@/utils/handlers";

const Form: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [userExist, setUserExist] = useState(true);
  const { handleUser } = useUseContext() as UserContextType;
  const router = useRouter();

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, {nameRef, emailRef, setUserExist, handleUser, router})
      }
      className="flex flex-col justify-center items-center w-full bg-white h-4/6 rounded-xl text-2xl text-gray-600 drop-shadow-2xl"
    >
      <h1 className="relative bottom-20 text-4xl">Sign In With</h1>
      <section
        aria-label="Login com redes sociais"
        className="w-4/6 flex justify-between items-center"
      >
        <button
          aria-label="Entrar com Facebook"
          className="relative bi bi-facebook bg-[#3b5998] text-white pt-5 pb-5 pr-2 pl-2 w-5/12 rounded-lg bottom-5"
        >
          Facebook
        </button>
        <button
          aria-label="Entrar com Google"
          className="relative bi bi-google bg-gray-800 text-white pt-5 pb-5 pr-2 pl-2 w-5/12 rounded-lg bottom-5"
        >
          Google
        </button>
      </section>
      <label
        htmlFor="username"
        className="relative w-4/6 top-5 text-lg pt-2 pb-2"
      >
        Username
      </label>
      <input
        id="username"
        placeholder="Digite seu nome..."
        name="username"
        ref={nameRef}
        required
        className="relative pl-4 pt-4 pb-4 w-4/6 rounded-lg top-5 bg-gray-200"
      />

      <label htmlFor="email" className="relative w-4/6 top-5 text-lg pt-2 pb-2">
        Email
      </label>
      <input
        id="email"
        placeholder="Digite seu email..."
        name="email"
        ref={emailRef}
        required
        className="relative pl-4 pt-4 pb-4 w-4/6 rounded-lg top-5 bg-gray-200"
      />
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
        className="relative bg-gray-800 text-white pt-2 pb-2 w-4/6 rounded-xl hover:scale-105 top-16 transition-all"
      >
        Sign in
      </button>
    </form>
  );
};

export default Form;
