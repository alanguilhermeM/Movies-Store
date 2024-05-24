import { Request, Response } from 'express';
import prisma from '../database';
import { UserMethods } from '../interfaces/interfaces';
import { TUser } from '../types/userTypes';

export default class UserController implements UserMethods {
    async createUser(req: Request, res: Response): Promise<Response<TUser> | undefined> {
        try {
            const { name, email, image_path } = req.body;
            const alreadyExist = await prisma.user.findUnique({ where: { email }})

            if(alreadyExist) {
                return res.status(400).json({message: 'Usario já cadastrado!'})
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    image_path
                }
            })

            return res.status(201).json({ message: 'Usuario cadastrado com sucesso!', user })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response<TUser> | undefined> {
        try {
            const { id } = req.params;
            const { name, email, image_path } = req.body;
            
            const userUpdated = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name,
                    email,
                    image_path
                }
            })

            return res.status(201).json({ message: 'Usuario atualizado com sucesso!', userUpdated })
        } catch (error) {
            res.status(404).json({ message: 'Usuario não encontrado!' })
        }
    }

    async listUser(req: Request, res: Response): Promise<Response<TUser> | undefined> {
        try {
            const { email } = req.params;
            
            const User = await prisma.user.findUnique({
                where: {
                    email
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    movie_rent: {
                        select: {
                            movie: true,
                        },
                    },
                    image_path: true
                }
            })

            if (!User) {
                return res.status(404).json({ message: 'Usuario não encontrado! Verifique seus dados' })
            }

            return res.status(200).json({ message: 'Usuario encontrado com sucesso!', User })
        } catch (error) {
            res.status(404).json({ message: 'Usuario não encontrado!' })
        }
    }

    async listAllUsers(_req: Request, res: Response): Promise<Response<TUser[]> | undefined> {
        try {
            const allUsers = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    movie_rent: {
                        select: {
                            movie: true,
                        },
                    },
                    image_path: true
                },
            })

            return res.status(200).json({ message: 'Lista de Usuarios encontrados com sucesso!', allUsers })
        } catch (error) {
            res.status(404).json({ message: 'Lista não encontrada!' })
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response<TUser> | undefined> {
        try {
            const { id } = req.params;
            
            const userExists = await prisma.user.findUnique({ where: { id: Number(id) } });

            if (!userExists) {
                return res.json({ message: 'Error: Post não encontrado!' });
            }

            const user = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })

            return res.status(201).json({ message: 'Usuario deletado com sucesso!', user })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    }
}