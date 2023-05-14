import express from 'express';
import { UserService } from '../services/userServices';
import { findAll } from '../controllers/userControllers';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();
const userRepo = new UserService();

router.get('/', auth, findAll);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await userRepo.findOne(parseInt(id));

  res.json(user);
});

export default router;
