import express from 'express';
import AuthController from '../controllers/AuthController';

const authController = new AuthController();
const router = express.Router();

router.post('/auth/login', authController.login);

export default router;
