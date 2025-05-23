import {type TMovieRent} from '../types/movieRentTypes';
import {type TMovie} from '../types/movieTypes';
import {type TUser} from '../types/userTypes';
import {type Request, type Response} from 'express';

export type UserMethods = {
	createUser(req: Request, res: Response): Promise<Response<TUser> | undefined>;
	updateUser(req: Request, res: Response): Promise<Response<TUser> | undefined>;
	listUser(req: Request, res: Response): Promise<Response<TUser> | undefined>;
	listAllUsers(req: Request, res: Response): Promise<Response<TUser[]> | undefined>;
	deleteUser(req: Request, res: Response): Promise<Response<TUser> | undefined>;
};

export type MovieMethods = {
	createMovie(req: Request, res: Response): Promise<Response<TMovie> | undefined>;
	updateMovie(req: Request, res: Response): Promise<Response<TMovie> | undefined>;
	listMovie(req: Request, res: Response): Promise<Response<TMovie> | undefined>;
	listAllMovies(req: Request, res: Response): Promise<Response<TMovie[]> | undefined>;
	deleteMovie(req: Request, res: Response): Promise<Response<TMovie> | undefined>;
	deleteAllMovies(req: Request, res: Response): Promise<Response<TMovie> | undefined>;
};

export type MovieRentMethods = {
	createMovieRent(req: Request, res: Response): Promise<Response<TMovieRent> | undefined>;
	updateMovieRent(req: Request, res: Response): Promise<Response<TMovieRent> | undefined>;
	getMoviesRent(req: Request, res: Response): Promise<Response<TMovieRent[]> | undefined>;
	deleteMovieRent(req: Request, res: Response): Promise<Response<TMovieRent> | undefined>;
};