import {type TMovie} from './movieTypes';
import {type TUser} from './userTypes';

export type MovieRentT = {
	user: TUser;
	userId: number;
	movie: TMovie;
	movieId: number;
};