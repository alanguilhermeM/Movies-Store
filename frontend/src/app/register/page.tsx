"use client";
import { api } from "@/service/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, FormEvent, useState } from "react";

const Register: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [registeredEmail, setRegisteredEmail] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const image_path = "";

    try {
      const response = await api.post("/user", {
        name,
        email,
        password,
        image_path,
      });

      if (response.status === 201) {
        router.push("/");
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        setRegisteredEmail(true);
      } else {
        console.error("Erro ao enviar requisição:", error);
      }
    }
  }

  return (
    <article className="flex h-screen bg-gradient-to-r bg-gray-400 justify-center">
      <main className="flex justify-center items-center w-full lg:w-[42rem]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full bg-white h-full lg:h-4/6 lg:rounded-xl text-2xl text-gray-600 drop-shadow-2xl"
        >
          <h1 className="relative bottom-10 text-4xl">Sign Up</h1>
          <label className="relative w-5/6 text-lg py-2">Username</label>
          <input
            placeholder="Digite seu nome..."
            name="username"
            ref={nameRef}
            required
            className="relative pl-4 py-4 w-5/6 rounded-lg bg-gray-100"
          />

          <label className="relative w-5/6 text-lg py-2">Email</label>
          <input
            placeholder="Digite seu email..."
            name="email"
            ref={emailRef}
            required
            className="relative pl-4 py-4 w-5/6 rounded-lg bg-gray-100"
          />

          <label className="relative w-5/6 text-lg py-2">Password</label>
          <input
            placeholder="Digite sua senha..."
            type="password"
            name="password"
            ref={passwordRef}
            required
            className="relative pl-4 py-4 w-5/6 rounded-lg bg-gray-100"
          />
          <p className="relative top-4 text-base">
            Já possui uma conta?{" "}
            <Link className="font-bold" href={"/login"}>
              Login
            </Link>
          </p>
          {registeredEmail ? (
            <span className="text-red-600 text-sm relative top-8 animate-bounce">
              Email já cadastrado!
            </span>
          ) : null}

          <button
            type="submit"
            className="relative bg-gray-800 text-white py-2 w-5/6 rounded-xl hover:scale-105 top-14 transition-all"
          >
            Sign Up
          </button>
        </form>
      </main>
    </article>
  );
};

export default Register;
