import { Dispatch, SetStateAction } from "react";

export type HeaderProps = {
  setSideBarOn: Dispatch<SetStateAction<boolean>>;
};

export type CardMovieProps = {
  sideBarOn: boolean;
};