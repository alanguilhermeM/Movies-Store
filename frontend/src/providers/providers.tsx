"use client";

import { UserProvider } from "@/context/userContext";
import { MovieProvider } from "@/context/movieContext";
import { MovieCardProvider } from "@/context/movieCardContext";
import { MyMovieCardProvider } from "@/context/myMovieCardContext";
import SideBar from "@/components/SideBar";
import { SideBarProvider } from "@/context/sideBarContext";
import NextAuthSessionProvider from "./sessionProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthSessionProvider>
      <UserProvider>
        <MovieProvider>
          <MovieCardProvider>
            <MyMovieCardProvider>
              <SideBarProvider>
                {children}
              </SideBarProvider>
            </MyMovieCardProvider>
          </MovieCardProvider>
        </MovieProvider>
      </UserProvider>
    </NextAuthSessionProvider>
  );
};
