import { TMovieRent } from "./movieRentTypes";

export type TMovie = {
    id?: number;
    title: string;
    release_date: string;
    description: string;
    image_path: string;
    movie_rent?: TMovieRent[];
}

export type MovieApi = {
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
}