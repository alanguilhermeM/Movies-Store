import {type MovieRentT} from '../types/movieRentTypes';
import {type MovieT} from '../types/movieTypes';
import {type UserT} from '../types/userTypes';
import {type Request, type Response} from 'express';

export type UserMethods = {
	createUser(req: Request, res: Response): Promise<Response<UserT> | undefined>;
	updateUser(req: Request, res: Response): Promise<Response<UserT> | undefined>;
	listUser(req: Request, res: Response): Promise<Response<UserT> | undefined>;
	listAllUsers(req: Request, res: Response): Promise<Response<UserT[]> | undefined>;
	deleteUser(req: Request, res: Response): Promise<Response<UserT> | undefined>;
};

export type MovieMethods = {
	createMovie(req: Request, res: Response): Promise<Response<MovieT> | undefined>;
	updateMovie(req: Request, res: Response): Promise<Response<MovieT> | undefined>;
	listMovie(req: Request, res: Response): Promise<Response<MovieT> | undefined>;
	listAllMovies(req: Request, res: Response): Promise<Response<MovieT[]> | undefined>;
	deleteMovie(req: Request, res: Response): Promise<Response<MovieT> | undefined>;
	deleteAllMovies(req: Request, res: Response): Promise<Response<MovieT> | undefined>;
};

export type MovieRentMethods = {
	createMovieRent(req: Request, res: Response): Promise<Response<MovieRentT> | undefined>;
	updateMovieRent(req: Request, res: Response): Promise<Response<MovieRentT> | undefined>;
	getMoviesRent(req: Request, res: Response): Promise<Response<MovieRentT[]> | undefined>;
	deleteMovieRent(req: Request, res: Response): Promise<Response<MovieRentT> | undefined>;
};