/* eslint-disable @typescript-eslint/naming-convention */
import {type Request, type Response} from 'express';
import prisma from '../database';
import {type MovieRentMethods} from '../interfaces/interfaces';
import {type MovieRentT} from '../types/movieRentTypes';

type RentMovieT = {
	userId: number;
	movieId: number;
};

export default class MovieRent implements MovieRentMethods {
	async createMovieRent(req: Request, res: Response): Promise<Response<MovieRentT> | undefined> {
		const {userId, movieId} = req.body as RentMovieT;

		const alreadyExist = await prisma.movieRent.findUnique({
			where: {
				userId_movieId: {
					userId: userId,
					movieId: movieId,
				},
			},
		});

		if (alreadyExist) {
			return res.status(400).json({message: 'Filme já alugado'});
		} else {
			const newMovieRent = await prisma.movieRent.create({
				data: {
					user: {
						connect: {id: userId},
					}, // ID do usuário associado
					movie: {
						connect: {id: movieId},
					}, // ID do filme associado
				},
				select: {
					movie: true,
				},
			});
			return res.status(201).json({message: 'Filme alugado cadastrado', newMovieRent});
		}
	}

	async getMoviesRent(_req: Request, res: Response): Promise<Response<MovieRentT[]> | undefined> {
		const moviesRent = await prisma.movieRent.findMany({
			include: {
				movie: true,
			},
		});

		return res.status(200).json({moviesRent});
	}

	async getMoviesRentByUser(req: Request, res: Response): Promise<Response<MovieRentT[]> | undefined> {
		const {id} = req.params;

		if (id) {
			const moviesRent = await prisma.movieRent.findMany({
				where: {
					userId: Number(id),
				},
				include: {
					movie: true,
				},
			});
    
			return res.status(200).json({moviesRent});
		} else {
			return res.status(500).json({message: 'Nescessario um id de usuario!'});
		}
	}

	async updateMovieRent(req: Request, res: Response): Promise<Response<MovieRentT> | undefined> {
		const {userId, movieId} = req.body as RentMovieT;
		await prisma.movieRent.delete({
			where: {
				userId_movieId: {
					userId: userId,
					movieId: movieId,
				},
			},
		});

		return res.status(200).json({message: 'Filme alugado alterado com sucesso'});
	}

	async deleteMovieRent(req: Request, res: Response): Promise<Response<MovieRentT> | undefined> {
		const {userId, movieId} = req.body as RentMovieT;
		await prisma.movieRent.delete({
			where: {
				userId_movieId: {
					userId: userId,
					movieId: movieId,
				},
			},
		});

		return res.status(200).json({message: 'Filme alugado deletado com sucesso'});
	}
}
