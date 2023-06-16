import { Router } from 'express';
import { getUsers, getUser } from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);

router.get('/users/:id', getUser);

// add get users logs

export default router;
