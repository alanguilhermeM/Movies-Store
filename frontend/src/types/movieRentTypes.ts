import { TMovie } from "./movieTypes";
import { TUser } from "./userTypes"

export type TMovieRent = {
    user: TUser;
    userId: number;
    movie: TMovie;
    movieId: number;
}