import {type MovieRentT} from './movieRentTypes';

export type UserT = {
	id: number;
	email: string;
	name: string;
	created_at: Date;
	updated_at: Date;
	movies_rent: MovieRentT[];
	image_path: string;
};