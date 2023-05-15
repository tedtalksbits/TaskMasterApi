import express from 'express';
import { findAll, findOneById } from '../controllers/userControllers';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', auth, findAll);
router.get('/:id', auth, findOneById);

export default router;
