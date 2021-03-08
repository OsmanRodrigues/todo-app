import { Request } from 'express';
import { TaskBusiness } from '@business/TaskBusiness';
import { Task, TaskBusinessDTO, TaskControllerAction, TaskDTO } from '@models';
import { CustomError } from '@tools';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

@Service()
export class TaskController {
  constructor(private taskBusiness: TaskBusiness) {}

  private body: Task | TaskDTO;

  private checkRequestInfos = (param: { req: Request; isCreate?: boolean }) => {
    const { req, isCreate } = param;

    if (!req.headers.authorization) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        'This request requires an authorization token.'
      );
    }

    const body = req.body;
    const bodyProperties = Object.keys(body);
    if (!bodyProperties.length) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        'This request requires a body.'
      );
    }

    bodyProperties.forEach(key => {
      const taksInfo = body[key as keyof typeof body];
      const customError = new CustomError(
        StatusCodes.BAD_REQUEST,
        `Card ${key} is required.`
      );

      if (!taksInfo && isCreate && key === 'title') {
        throw customError;
      } else if (!taksInfo && !isCreate && key !== 'content') {
        throw customError;
      }
    });
  };

  create: TaskControllerAction = async (req, res) => {
    try {
      this.body = req.body;
      this.checkRequestInfos({ req, isCreate: true });

      const taskBusinessDTO: TaskBusinessDTO = {
        authorization: req.headers.authorization,
        taskInfos: { ...this.body, list: 'NEW' }
      };

      const createdTask = await this.taskBusiness.create(taskBusinessDTO);

      res.status(StatusCodes.CREATED).send({ createdTask });
    } catch (err) {
      res.status(err.status).send({ message: err.message });
    }
  };
}
