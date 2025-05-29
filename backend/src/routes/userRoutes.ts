import express from 'express';

import UserController from '../controllers/UserController';

const uController = new UserController;

const router = express.Router();

router.get('/user/:email', uController.listUser);
router.get('/users', uController.listAllUsers);
router.post('/user', uController.createUser);
router.put('/user/:id', uController.updateUser);
router.delete('/user/:id', uController.deleteUser);

export default router;
