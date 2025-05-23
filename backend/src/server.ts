import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());

import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import movieRentRoutes from './routes/movieRentRoutes';

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);

app.use('/', userRoutes);
app.use('/', movieRoutes);
app.use('/', movieRentRoutes);
app.use('/', authRoutes);

const port = process.env.PORT ?? 3002;

app.listen(port, () => {
	console.log(`Servidor Express rodando na porta ${port}`);
});
