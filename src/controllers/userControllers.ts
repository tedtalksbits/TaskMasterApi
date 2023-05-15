import { Request, Response } from 'express';
import { UserService } from '../services/userServices';

const userService = new UserService();

export const findAll = async (_req: Request, res: Response) => {
  const users = await userService.findAll();
  res.json(users);
};

export const findOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.findOneById(parseInt(id));

  return res.json(user);
};

export const findOneByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) res.status(400).send('Email is required');
  const user = await userService.findOneByEmail(email);

  if (!user) return res.status(404).send('User not found');

  return res.json(user);
};

export const findOneByPhone = async (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) res.status(400).send('Phone is required');
  const user = await userService.findOneByPhone(phone);

  if (!user) return res.status(404).send('User not found');

  return res.json(user);
};

export const findOneByUsername = async (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) res.status(400).send('Username is required');
  const user = await userService.findOneByUsername(username);

  if (!user) return res.status(404).send('User not found');

  return res.json(user);
};
