import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieContextType, SideBarProps, UserContextType } from "@/interfaces/interfaces";
import { useUseContext } from "@/context/movieContext";
import { useUseContext as useContext } from "@/context/userContext";
import { api } from "@/service/api";
import { TMovie } from "@/types/movieTypes";

const SideBar: React.FC<SideBarProps> = ({ loggedIn ,sideBar, setSideBar, keepLogged }) => {
  const { movies, handleSearchMovies, handleSearchMyMovies } = useUseContext() as MovieContextType;
  const { user } = useContext() as UserContextType;
  const [img, setImg] = useState<string | undefined>('')

  useEffect(() => {
    if (user?.image_path && user?.image_path.length > 1) {
      setImg(user?.image_path)
    }
  }, [user]);

  const Close = () => {
    if (loggedIn) {
      setSideBar(false);

      document.querySelector("#sidebar")?.classList.toggle("left-[-18.75rem]");
    }
  };

  const Logout = async () => {
    localStorage.removeItem('User');
    window.location.reload();
  }

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    
    if (movies) {
      const search = movies?.filter((movie) => movie.title.includes(target.value))

      handleSearchMovies(search)
    }
  
    const local = localStorage.getItem('User');
    if (local) {
        const { id } = JSON.parse(local);
        try {
          const response = await api.get(`/moviesRentByUser/${id}`);
          const moviesRent = response.data.moviesRent;
          if (response.status === 200 && response.data) {
            const moviesArray = moviesRent.map((item: any) => item.movie); // Extrair apenas os filmes
            const search = moviesArray?.filter((movie: TMovie) => movie.title.includes(target.value))
            handleSearchMyMovies(search)
          }
        } catch (error) {
          console.log(error);
        }
    }
  }

  return (
    <div className="flex items-center w-4/5 text-2xl text-blue-500 justify-center m-0">
      {sideBar ? (
        <div
          className="sidebar fixed top-0 bottom-0 left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-800 transition-all duration-300"
          id="sidebar"
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center justify-between">
              <Image
                src={img || '/profile.png'}
                alt="Locadora Logo"
                width={50}
                height={50}
                quality={50}
                className="rounded-full"
              />
              <h1 className="font-bold text-gray-200 text-[25px] mr-3">
                {keepLogged?.name}
              </h1>
              <Image
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={() => Close()}
                src="/xIcon.png"
                alt="icon"
                width={20}
                height={20}
              />
            </div>

            <hr className="my-2 text-gray-600" />

            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700">
              <i className="bi bi-search text-sm" />
              <input
                type="text"
                placeholder="Search"
                className="text-[15px] ml-4 w-full bg-transparent"
                onChange={handleSearch}
              />
            </div>

            <Link href='/'>
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-300 text-white">
                <i className="bi bi-house-door-fill" />
                <span className="text-[15px] ml-4 text-gray-200">Home</span>
              </div>
            </Link>

            <Link href='/myMovies'>
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-300 text-white">
                <i className="bi bi-film" />
                <span className="text-[15px] ml-4 text-gray-200">My Movies</span>
              </div>
            </Link>

            <hr className="my-4 text-gray-600" />

            <Link href='/profile'>
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-300 text-white">
                <i className="bi bi-person-fill" />
                <span className="text-[15px] ml-4 text-gray-200">
                  Your Profile
                </span>
              </div>
            </Link>

            <div className="p-2.5 mt-3 flex relative items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-300 text-white top-[32.5rem]">
              <button onClick={Logout}>
              <i className="bi bi-box-arrow-right" />
                <span className="text-[15px] ml-4 text-gray-200">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      ) : null
      }
    </div>
  );
};

export default SideBar;
