const express = require('express');

import MovieController from '../controllers/MovieController';

const mController = new MovieController

const router = express.Router();

router.get('/movie/:id', mController.listMovie );
router.get('/movies', mController.listAllMovies);
router.post('/movie', mController.createMovie);
router.put('/movie/:id', mController.updateMovie);
router.delete('/movie/:id', mController.deleteMovie);
router.delete('/movies', mController.deleteAllMovies);

module.exports = router;
