import { Router } from 'express';
import { signup } from '@controllers/user';

export const routes = Router();

routes.post('/signup', signup);

export default routes;
