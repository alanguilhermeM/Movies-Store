import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';
import {type Request, type Response} from 'express';

const prisma = new PrismaClient();

type AuthT = {
	email: string;
	password: string;
};

class AuthController {
	async login(req: Request, res: Response) {
		const {email, password} = req.body as AuthT;

		try {
			// Busca o usuário pelo email
			const jwtSecret = process.env.JWT_SECRET;
			if (!jwtSecret) {
				throw new Error('JWT_SECRET is not defined in the environment variables');
			}
			
			const user = await prisma.user.findUnique({where: {email}});

			if (!user) {
				return res.status(404).json({message: 'User not found'});
			}

			// Valida a senha
			const isValidPassword = await bcrypt.compare(password, user.password);

			if (!isValidPassword) {
				return res.status(401).json({message: 'Invalid credentials'});
			}

			// Gera um token
			const token = jwt.sign(
				{id: user.id, email: user.email},
				process.env.JWT_SECRET!,
				{expiresIn: '1h'},
			);

			// Retorna os dados do usuário e o token
			return res.json({
				id: user.id,
				email: user.email,
				name: user.name,
				token,
			});
		} catch (error) {
			res.status(500).json({
			  message: 'Erro de autenticação',
			  body: req.body,
			  error: error instanceof Error ? error.message : error,
			});
		  }
	}
}

export default AuthController;
