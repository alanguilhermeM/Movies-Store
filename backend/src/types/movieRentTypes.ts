import {type MovieT} from './movieTypes';
import {type UserT} from './userTypes';

export type MovieRentT = {
	user: UserT;
	userId: number;
	movie: MovieT;
	movieId: number;
};