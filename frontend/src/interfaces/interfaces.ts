import { TMovie } from "@/types/movieTypes";
import { TUser } from "@/types/userTypes";
import { Dispatch, SetStateAction } from "react";

export interface UserContextType {
  user: TUser | undefined;
  handleUser: (user: TUser) => void;
}

export interface MovieContextType {
  movies: TMovie[] | undefined;
  handleMovies: (movies: TMovie[]) => void;
  searchMovies: TMovie[] | undefined;
  handleSearchMovies: (movies: TMovie[]) => void;
  searchMyMovies: TMovie[] | undefined;
  handleSearchMyMovies: (movies: TMovie[]) => void;
}

export interface MovieCardContextType {
  hoveredMovie: TMovie | null;
  setHoveredMovie: Dispatch<SetStateAction<TMovie | null>>
  loginState: (string | boolean)[];
  setLoginState: Dispatch<SetStateAction<(string | boolean)[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<(number)>>;
}

export interface SideBarProps {
  loggedIn: boolean;
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  keepLogged?: TUser;
}

export interface MovieCardProps {
  movie: TMovie;
}