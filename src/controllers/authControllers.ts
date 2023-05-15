import { Request, Response } from 'express';
import { AuthServices } from '../services/authServices';
import { InsertUser, UserService } from '../services/userServices';
import CryptoJS from 'crypto-js';

const authServices = new AuthServices();
const userServices = new UserService();

export const loginUsernamePassword = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  const user = await userServices.findOneByUsername(username);

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (!process.env.SECRET_KEY) throw new Error('Crypto secret not found');
  const decryptedPw = CryptoJS.AES.decrypt(
    user.password,
    process.env.SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  if (decryptedPw !== password) {
    return res.status(401).send('Invalid credentials');
  }

  const authToken = authServices.generateAuthToken(user);

  req.session!.authToken = authToken;

  const loggedInUser = await authServices.loginUsernamePassword(
    username,
    password
  );

  if (!loggedInUser) {
    return res.status(401).send('Invalid credentials');
  }

  return res.status(200).json(loggedInUser);
};

export const registerUser = async (req: Request, res: Response) => {
  const userInfo: InsertUser = req.body;

  if (
    !userInfo.username ||
    !userInfo.password ||
    !userInfo.first_name ||
    !userInfo.last_name
  ) {
    return res.status(400).send('Missing required fields');
  }

  const userFound = await userServices.findOneByUsername(userInfo.username);

  if (userInfo.email) {
    const emailFound = await userServices.findOneByEmail(userInfo.email);
    if (emailFound) {
      return res.status(400).send('Email already exists');
    }
  }

  if (userFound) {
    return res.status(400).send('User already exists');
  }

  if (!process.env.SECRET_KEY) throw new Error('Crypto secret not found');
  const hash = CryptoJS.AES.encrypt(
    userInfo.password,
    process.env.SECRET_KEY
  ).toString();

  userInfo.password = hash;

  const newUser = await userServices.insertOne(userInfo);

  return res.json(newUser);
};
