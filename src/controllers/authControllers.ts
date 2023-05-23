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
  try {
    const user = await userServices.findOneByUsername(username);

    if (!user) {
      // clear cookie
      req.session = null;
      return res.status(404).send('User not found');
    }

    if (!process.env.SECRET_KEY) throw new Error('Crypto secret not found');

    const decryptedPw = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY || user.password.slice(0, 8).toString()
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPw !== password) {
      return res.status(401).send('Invalid credentials');
    }

    const authToken = authServices.generateAuthToken(user);

    req.session = {
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        authToken,
      },
    };

    return res.status(200).json({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal server error');
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, first_name, last_name, phone, email } = req.body;
  let { password } = req.body;
  if (!username || !password || !first_name || !last_name || !phone || !email) {
    return res.status(400).send('Missing required fields');
  }

  const userExist = await userServices.findOneByUsername(username);

  if (userExist) {
    return res.status(400).send('User already exists');
  }

  const emailExist = await userServices.findOneByEmail(email);

  if (emailExist) {
    return res.status(400).send('Email already exists');
  }

  if (!process.env.SECRET_KEY) throw new Error('Crypto secret not found');
  let hash = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_KEY || password.splice(0, 8)
  ).toString();

  password = hash;

  try {
    const newUser = await userServices.insertOne({
      username,
      first_name,
      last_name,
      password,
      phone,
      email,
    });

    return res.json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal server error');
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session = null;
  return res.status(200).send('Logout successful');
};
