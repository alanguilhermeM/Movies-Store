"use client"
import { createContext, useContext, useState } from "react";
import { TMovie } from '../types/movieTypes'
import { MovieCardContextType } from "@/interfaces/interfaces";

const MovieCardContext = createContext<MovieCardContextType | undefined>(undefined)

export const MovieCardProvider = ({ children }: { children: React.ReactNode }) => {
    const [hoveredMovie, setHoveredMovie] = useState<TMovie | null>(null);
    const [loginState, setLoginState] = useState<(string | boolean)[]>(["", false]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [rented, setRented] = useState(false);

    return <MovieCardContext.Provider value={{hoveredMovie, setHoveredMovie, loginState, setLoginState, currentPage, setCurrentPage, loading, setLoading, rented, setRented}}>{children}</MovieCardContext.Provider>;
}

export const useCardContext = () => {
    const context = useContext(MovieCardContext);
    if (!context) {
        throw new Error("useCardContext must be used within a MovieCardProvider");
    }
    return context;
};