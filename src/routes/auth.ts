import express from 'express';
import {
  loginUsernamePassword,
  logout,
  registerUser,
} from '../controllers/authControllers';

const router = express.Router();

router.post('/login', loginUsernamePassword);
router.post('/register', registerUser);
router.post('/logout', logout);

export default router;
