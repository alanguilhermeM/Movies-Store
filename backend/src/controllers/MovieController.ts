import { Request, Response } from 'express';
import prisma from '../database';
import { TMovie } from '../types/movieTypes';
import { MovieMethods } from '../interfaces/interfaces';

type Movie = {
    title: string;
    release_date: string;
    description: string;
    image_path: string;
    page: number;
}

export default class MovieController implements MovieMethods {
    async createMovie(req: Request, res: Response): Promise<Response<TMovie> | undefined> {
        try {
            const { title, release_date, description, image_path, page }: Movie = req.body;
            if (title && release_date && description && image_path && page) {
                const alreadyExist = await prisma.movie.findUnique({ where: { title }})
    
                if(alreadyExist) {
                    return res.status(400).json({message: 'Filme já cadastrado!'})
                }

                
    
                const movie = await prisma.movie.createMany({
                    data: {
                        title,
                        release_date,
                        description,
                        image_path,
                        page
                    }
                })
    
                return res.status(201).json({ message: 'Filme cadastrado com sucesse!', movie })
            } else {
                return res.status(403).json({ message: 'essa porra ta faltando'})
            }
        } catch (error: any) {
            res.status(500).json({ message: error.response })
        }
    }

    async updateMovie(req: Request, res: Response): Promise<Response<TMovie> | undefined> {
        try {
            const { id } = req.params;
            const { title, release_date, description, image_path, page } = req.body;
            
            const movieUpdated = await prisma.movie.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title,
                    release_date,
                    description,
                    image_path,
                    page
                }
            })

            return res.status(201).json({ message: 'Filme atualizado com sucesso!', movieUpdated })
        } catch (error) {
            res.status(404).json({ message: 'Filme não encontrado!' })
        }
    }

    async listMovie(req: Request, res: Response): Promise<Response<TMovie> | undefined> {
        try {
            const { id } = req.params;
            
            const movie = await prisma.movie.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json({ message: 'Filme encontrado com sucesso!', movie })
        } catch (error) {
            res.status(404).json({ message: 'Filme não encontrado!' })
        }
    }

    async listAllMovies(req: Request, res: Response): Promise<Response<TMovie[]> | undefined> {
        try {
            const allMovies = await prisma.movie.findMany()

            return res.status(200).json({ message: 'Lista de Filmes encontrados com sucesso!', allMovies })
        } catch (error) {
            res.status(404).json({ message: 'Filmes não encontrados!' })
        }
    }

    async deleteMovie(req: Request, res: Response): Promise<Response<TMovie> | undefined> {
        try {
            const { id } = req.params;
            
            const movieExists = await prisma.movie.findUnique({ where: { id: Number(id) } });

            if (!movieExists) {
                return res.json({ message: 'Error: Filme não encontrado!' });
            }

            const movie = await prisma.movie.delete({
                where: {
                    id: Number(id)
                }
            })

            return res.status(201).json({ message: 'Filme deletado com sucesso!', movie })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    }

    async deleteAllMovies(req: Request, res: Response): Promise<Response<TMovie> | undefined> {
        try {
            const movieExists = await prisma.movie.deleteMany();

            return res.status(201).json({ message: 'Todos os filmes foram deletados', movieExists })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    }
}