import express from 'express';
import {
  loginUsernamePassword,
  logout,
  registerUser,
} from '../controllers/authControllers';
import { whoami } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', loginUsernamePassword);
router.post('/register', registerUser);
router.post('/logout', logout);
router.get('/me', whoami);

export default router;
