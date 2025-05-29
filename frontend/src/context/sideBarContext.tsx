"use client"
import { createContext, useContext, useState } from "react";
import { sideBarContextType } from "@/interfaces/interfaces";

const sideBarContext = createContext<sideBarContextType | undefined>(undefined)

export const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
    const [sideBar, setSideBar] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const toggleSideBar = () => {
      if (loggedIn) setSideBar((prev) => !prev);
    };

    return <sideBarContext.Provider value={{sideBar, setSideBar, loggedIn, setLoggedIn, toggleSideBar}}>{children}</sideBarContext.Provider>;
}

export const useSideBarContext = () => {
    const context = useContext(sideBarContext);
    if (!context) {
        throw new Error("sideBarContext must be used within a sideBarProvider");
    }
    return context;
};