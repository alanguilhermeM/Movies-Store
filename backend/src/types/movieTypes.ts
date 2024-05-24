import { TMovieRent } from "./movieRentTypes";

export type TMovie = {
    id: number;
    title: string;
    release_date: string;
    description: string;
    image_path: string;
    page: number;
    movie_rent: TMovieRent[];
}