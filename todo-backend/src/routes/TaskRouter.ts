import { Router } from 'express';
import Container from 'typedi';
import { TaskController } from '@controllers/TaskController';

const taskController = Container.get(TaskController);

export const TaskRouter = Router();

TaskRouter.post('/cards', taskController.create);
