import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import {
  registerCompany,
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController';
import { setVersion } from '../middlewares/setVersion';
// import logActivity from '../middlewares/logActivity';

const router = Router();

router.post('/auth/registerUser', registerUser);

router.post('/auth/login', loginUser);

router.post('/auth/logout', authenticate, logoutUser);

router.post('/auth/registerCompany', setVersion(1), registerCompany);

router.post('/auth/registerCompany/v2', setVersion(2), registerCompany) 

export default router;
