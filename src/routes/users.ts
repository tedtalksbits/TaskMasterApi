import express from 'express';
import { UserService } from '../services/userServices';

const router = express.Router();
const userRepo = new UserService();

router.get('/', async (_req, res) => {
  const users = await userRepo.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await userRepo.findOne(parseInt(id));

  res.json(user);
});

export default router;
