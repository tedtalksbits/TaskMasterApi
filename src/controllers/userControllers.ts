import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
export const findAll = async (_req: Request, res: Response) => {
  const userService = new UserService();
  const users = await userService.findAll();
  res.json(users);
};
