"use client"
import { createContext, useCallback, useContext, useState } from "react";
import { TUser } from '../types/userTypes'
import { UserContextType } from "@/interfaces/interfaces";

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<TUser | undefined>(undefined);
    const [img, setImg] = useState<string | undefined | null>(undefined);

    const handleUser = useCallback(( user: TUser) => {
        setUser(user)
    }, [])

    return <UserContext.Provider value={{user, handleUser, img, setImg}}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);