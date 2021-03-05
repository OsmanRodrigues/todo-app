import { Router } from 'express';
import { signup } from '@endpoints/user';

export const routes = Router();

routes.post('/signup', signup);

export default routes;
