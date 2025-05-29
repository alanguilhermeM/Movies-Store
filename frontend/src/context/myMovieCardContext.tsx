"useClient"
import { createContext, useContext, useState } from "react";
import { TMovie } from '../types/movieTypes'
import { MyMovieCardContextType } from "@/interfaces/interfaces";

const MyMovieCardContext = createContext<MyMovieCardContextType | undefined>(undefined)

export const MyMovieCardProvider = ({ children }: { children: React.ReactNode }) => {
    const [myMovies, setMyMovies] = useState<TMovie[] | undefined >(undefined);

    return <MyMovieCardContext.Provider value={{myMovies, setMyMovies}}>{children}</MyMovieCardContext.Provider>;
}

export const useMyCardContext = () => {
    const context = useContext(MyMovieCardContext);
    if (!context) {
        throw new Error("useMyCardContext must be used within a MyMovieCardProvider");
    }
    return context;
};