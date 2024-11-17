import { NextRouter } from "next/router";
import { TUser } from "@/types/userTypes";
import { Dispatch, SetStateAction } from "react";

interface HandleSubmitData {
  emailRef: React.RefObject<HTMLInputElement>;
  nameRef: React.RefObject<HTMLInputElement>;
  handleUser: (user: TUser) => void;
  setUserExist: React.Dispatch<React.SetStateAction<boolean>>;
  router: NextRouter;
}

interface HandlePageData {
  setCurrentPage: Dispatch<SetStateAction<number>>,
  currentPage: number,
}

export type {
    HandleSubmitData,
    HandlePageData,
}