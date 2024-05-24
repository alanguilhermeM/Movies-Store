import { TMovie } from "@/types/movieTypes";
import { TUser } from "@/types/userTypes";

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

export interface SideBarProps {
  loggedIn: boolean;
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  keepLogged?: TUser;
}
