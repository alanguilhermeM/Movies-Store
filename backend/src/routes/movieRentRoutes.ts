import express from 'express';

import MovieRentController from '../controllers/MovieRentController';

const mController = new MovieRentController;

const router = express.Router();

// router.get('/movie/:id', mController.listMovie );
router.get('/moviesRent', mController.getMoviesRent);
router.get('/moviesRentByUser/:id', mController.getMoviesRentByUser);
router.post('/movieRent', mController.createMovieRent);
// router.put('/movie/:id', mController.updateMovie);
router.delete('/movieRent', mController.deleteMovieRent);

export default router;
