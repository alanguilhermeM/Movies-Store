import { NextRouter } from "next/router";
import { TUser } from "@/types/userTypes";
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface HandleSubmitData {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  handleUser: (user: TUser) => void;
  setUserExist: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance;
}

interface HandlePageData {
  setCurrentPage: Dispatch<SetStateAction<number>>,
  currentPage: number,
}

export type {
    HandleSubmitData,
    HandlePageData,
}