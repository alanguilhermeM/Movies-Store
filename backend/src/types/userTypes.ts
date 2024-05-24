import { TMovieRent } from "./movieRentTypes";

export type TUser = {
    id: number;
    email: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    movies_rent: TMovieRent[];
    image_path: string
}