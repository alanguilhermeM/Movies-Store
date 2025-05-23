import {type MovieRentT} from './movieRentTypes';

export type MovieT = {
	id: number;
	title: string;
	release_date: string;
	description: string;
	image_path: string;
	page: number;
	movie_rent: MovieRentT[];
};