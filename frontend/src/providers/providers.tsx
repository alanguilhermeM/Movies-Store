'use client';

import { UserProvider } from "@/context/userContext";
import { MovieProvider } from "@/context/movieContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <UserProvider><MovieProvider>{children}</MovieProvider></UserProvider>;
}