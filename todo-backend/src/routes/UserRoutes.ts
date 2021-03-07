import { Router } from 'express';
import { UserController } from '@controllers/UserController';

export const UserRouter = Router();

UserRouter.post('/signup', new UserController().signup);

export default UserRouter;
