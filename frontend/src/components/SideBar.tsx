"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MovieContextType,
  UserContextType,
  sideBarContextType,
} from "@/interfaces/interfaces";
import { useUserContext as useContext } from "@/context/userContext";
import { useSideBarContext } from "@/context/sideBarContext";
import { useRouter, usePathname } from "next/navigation";
import { useMovieContext } from "@/context/movieContext";
import { api } from "@/service/api";
import { TMovie } from "@/types/movieTypes";
import { signOut } from "next-auth/react";
import { TUser } from "@/types/userTypes";

const SideBar: React.FC = () => {
  const { sideBar, toggleSideBar } = useSideBarContext() as sideBarContextType;
  const { movies, handleSearchMovies, handleSearchMyMovies } =
    useMovieContext() as MovieContextType;
  // const { user, img } = useContext() as UserContextType;
  const [localUser, setLocalUser] = useState<TUser>();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const local = localStorage.getItem("User");
    if (local) setLocalUser(JSON.parse(local));
  }, []);

  const Logout = async () => {
    try {
      await signOut({ redirect: false });

      router.push("/login");

      toggleSideBar();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const useHandleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (movies) {
      const search = movies?.filter((movie) =>
        movie.title.includes(target.value)
      );

      handleSearchMovies(search);
    }

    if (localUser) {
      const { id } = localUser;
      try {
        const response = await api.get(`/moviesRentByUser/${id}`);
        const moviesRent = response.data.moviesRent;
        if (response.status === 200 && response.data) {
          const moviesArray = moviesRent.map((item: any) => item.movie);
          const search = moviesArray?.filter((movie: TMovie) =>
            movie.title.includes(target.value)
          );
          handleSearchMyMovies(search);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="flex items-center xl:w-4/5 text-2xl text-blue-500 justify-center m-0">
      <article
        className={`fixed xl:flex xl:flex-col top-0 bottom-0 left-0 p-2 max-xl:w-full max-xl:min-h-fit  xl:w-[300px] overflow-y-auto text-center bg-gray-800 transition-transform ease-in-out duration-300 ${
          sideBar
            ? "max-lg:translate-y-0 xl:translate-x-0"
            : "max-xl:-translate-y-full xl:-translate-x-full "
        }`}
        id="sidebar"
      >
        <nav className="text-gray-100 text-xl flex flex-col justify-between h-full">
          <div>
            <section className="p-2.5 mt-1 flex items-center justify-between">
              <Image
                src={localUser?.image_path || "/profile.png"}
                alt="Locadora Logo"
                width={50}
                height={50}
                quality={50}
                className="rounded-full"
              />
              <h1 className="font-bold text-gray-200 text-[25px] mr-3">
                {localUser?.name}
              </h1>
              <Image
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={() => toggleSideBar()}
                src="/xIcon.png"
                alt="icon"
                width={20}
                height={20}
              />
            </section>

            <hr className="my-2 text-gray-600" />

            {pathname !== "/profile" && (
              <p className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700">
                <i className="bi bi-search text-sm" />
                <input
                  type="text"
                  placeholder="Search"
                  aria-label="Search movies"
                  className="text-[15px] ml-4 w-full bg-transparent"
                  onChange={useHandleSearch}
                />
              </p>
            )}

            <Link href="/">
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-300 text-white">
                <i className="bi bi-house-door-fill" />
                <p className="text-[15px] ml-4 text-gray-200">Home</p>
              </div>
            </Link>

            <Link href="/myMovies">
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-300 text-white">
                <i className="bi bi-film" />
                <p className="text-[15px] ml-4 text-gray-200">My Movies</p>
              </div>
            </Link>

            <hr className="my-4 text-gray-600" />

            <Link href="/profile">
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-300 text-white">
                <i className="bi bi-person-fill" />
                <p className="text-[15px] ml-4 text-gray-200">Your Profile</p>
              </div>
            </Link>
          </div>

          <button
            onClick={Logout}
            className="w-full p-2.5 mt-3 flex relative items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-300"
          >
            <i className="bi bi-box-arrow-right" />
            <p className="text-[15px] ml-4 text-gray-200">Sign Out</p>
          </button>
        </nav>
      </article>
    </main>
  );
};

export default SideBar;
