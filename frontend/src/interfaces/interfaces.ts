import { TMovie } from "@/types/movieTypes";
import { TUser } from "@/types/userTypes";
import { Dispatch, SetStateAction } from "react";

export interface UserContextType {
  user: TUser | undefined;
  handleUser: (user: TUser) => void;
  img: string | undefined | null;
  setImg: Dispatch<SetStateAction<string | null | undefined>>
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
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  rented: boolean;
  setRented: Dispatch<SetStateAction<boolean>>;
}

export interface MovieCardProps {
  movie: TMovie;
}

export interface MyMovieCardContextType {
  myMovies: TMovie[] | undefined;
  setMyMovies: Dispatch<SetStateAction<TMovie[] | undefined>>
}

export interface sideBarContextType {
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  toggleSideBar: () => void;
}