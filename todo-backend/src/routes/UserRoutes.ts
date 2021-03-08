import { Router } from 'express';
import { UserController } from '@controllers/UserController';
import Container from 'typedi';

const userController = Container.get(UserController);

export const UserRouter = Router();

UserRouter.post('/signup', userController.signup);
UserRouter.post('/login', userController.login);

export default UserRouter;
