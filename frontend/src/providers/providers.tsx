'use client';

import { UserProvider } from "@/context/userContext";
import { MovieProvider } from "@/context/movieContext";
import { MovieCardProvider } from "@/context/movieCardContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <UserProvider><MovieProvider><MovieCardProvider>{children}</MovieCardProvider></MovieProvider></UserProvider>;
}