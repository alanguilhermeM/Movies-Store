"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";
import { UserContextType, sideBarContextType } from "@/interfaces/interfaces";
import { useEffect } from "react";
import SideBar from "./SideBar";
import { useSideBarContext } from "@/context/sideBarContext";
import { useSession } from "next-auth/react";
import { gSubmit2 } from "@/utils/formHandlers";

const Header: React.FC = () => {
  const { user, img, setImg, handleUser } = useUserContext() as UserContextType;
  const { loggedIn, setLoggedIn, sideBar, toggleSideBar } =
    useSideBarContext() as sideBarContextType;
  const { data: session, status } = useSession();

  const memoizedHandleImg = useCallback(
    () => {
      if (user?.image_path) {
        localStorage.setItem('ProfileImg', user.image_path)
        setImg(user.image_path)
      } else if (session?.user?.image) {
        setImg(session?.user?.image);
      } else {
        const img = localStorage.getItem('ProfileImg');
        setImg(img);
      }
    },
    [user, session, setImg]
  );

  useEffect(() => {
    memoizedHandleImg();

    if (!user && session) {
      setLoggedIn(true);
    }

    if (user) {
      const localUser = localStorage.getItem("User");
      if (!localUser || JSON.parse(localUser).email !== user.email) {
        localStorage.setItem("User", JSON.stringify(user));
        setLoggedIn(true);
      } else {
        setLoggedIn(true)
      }
    }
  }, [user, session, status, memoizedHandleImg, handleUser, setLoggedIn, img]);

  return (
    <header className="flex fixed w-full z-50 p-3 bg-gray-800 justify-center shadow-2xl m-0">
      <div className="flex items-center w-4/5 text-2xl text-white justify-center m-0">
        {loggedIn ? (
          <section className="h-16">

            <Image
              id="profile"
              src={img ? img : "/profile.png"}
              alt="Locadora Logo"
              aria-expanded={sideBar ? "true" : "false"}
              aria-label="Open menu"
              width={70}
              height={70}
              quality={50}
              className={`relative rounded-full cursor-pointer hover:scale-105 transition-all xl:right-[34rem] 2xl:right-[42rem] 3xl:right-[52rem] ${
                sideBar ? "hidden" : ""
              }`}
              onClick={() => toggleSideBar()}
            />
            <SideBar />
          </section>
        ) : (
          <section className="flex items-center w-full max-md:justify-around md:justify-between">
            <Image
              src="/logoMovie.png"
              alt="Locadora Logo"
              width={50}
              height={50}
              quality={50}
            />
            <nav className="flex w-[42rem] max-3xl:justify-end">
              <Link href="/login" className="hover:scale-105 transition-all">
                Sign In
              </Link>
              <Link href="/register" className="hover:scale-105 transition-all max-md:pl-4 max-3xl:pl-8">
                Sign Up
              </Link>
            </nav>
          </section>
        )}
      </div>
    </header>
  );
};

export default Header;
