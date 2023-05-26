import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routes';
import app_config from './config/serverConfig';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: app_config.app_urls,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.SESSION_SECRET || 'thisisrequired',
  })
);
app.set('trust proxy', 1);

app.use('/api/v1', router);

const PORT = process.env.PORT || 3000;

console.log('NODE_ENV:', process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
