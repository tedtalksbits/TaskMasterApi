import { Request } from 'express';
// req.session
type Session = {
  authToken: string;
};
declare module 'express-session' {
  export interface Request {
    session?: Session;
  }
}
