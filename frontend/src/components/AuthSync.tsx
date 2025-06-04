"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { gSubmit2 } from "@/utils/formHandlers";
import { useUserContext } from "@/context/userContext"; 
import { UserContextType } from "@/interfaces/interfaces";

const AuthSync = () => {
  const { data: session, status } = useSession();
  const { handleUser } = useUserContext() as UserContextType;

  useEffect(() => {
    // console.log("AUTH:", session, status)
    if (
      status === "authenticated" &&
      session?.user?.email &&
      session?.user?.name &&
      session?.user?.image
    ) {
      gSubmit2(session, handleUser);
    }
  }, [status, session, handleUser]);

  return null;
};

export default AuthSync;
