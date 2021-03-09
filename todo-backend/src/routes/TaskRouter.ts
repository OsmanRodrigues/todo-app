import { Router } from 'express';
import Container from 'typedi';
import { TaskController } from '@controllers/TaskController';

const taskController = Container.get(TaskController);

export const TaskRouter = Router();

TaskRouter.post('/cards', taskController.create);
TaskRouter.get('/cards', taskController.get);
TaskRouter.put('/cards/:id', taskController.update);
TaskRouter.delete('/cards/:id', taskController.delete);
