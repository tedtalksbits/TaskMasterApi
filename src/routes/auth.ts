import express from 'express';
import {
  loginUsernamePassword,
  registerUser,
} from '../controllers/authControllers';

const router = express.Router();

router.post('/login', loginUsernamePassword);
router.post('/register', registerUser);

export default router;
