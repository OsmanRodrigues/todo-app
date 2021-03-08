import { Request } from 'express';
import { TaskBusiness } from '@business/TaskBusiness';
import { Task, TaskBusinessDTO, TaskControllerAction, TaskDTO } from '@models';
import { CustomError } from '@tools';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import { IncomingHttpHeaders } from 'node:http2';

@Service()
export class TaskController {
  constructor(private taskBusiness: TaskBusiness) {}

  private body: Task | TaskDTO;
  private headers: IncomingHttpHeaders;

  private checkRequestInfos = (param: {
    body: Task | TaskDTO;
    headers: IncomingHttpHeaders;
    isCreate?: boolean;
  }) => {
    const { body, headers, isCreate } = param;

    if (!headers.authorization) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        'This request requires an authorization token.'
      );
    }

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
      this.body = {
        title: req.body.title,
        list: req.body.list,
        content: req.body.content
      } as Task;
      this.headers = req.headers;

      this.checkRequestInfos({
        body: this.body,
        headers: this.headers,
        isCreate: true
      });

      const taskBusinessDTO: TaskBusinessDTO = {
        authorization: this.headers.authorization,
        taskInfos: { ...this.body, list: 'NEW' }
      };

      const createdTask = await this.taskBusiness.create(taskBusinessDTO);

      res.status(StatusCodes.CREATED).send({ createdTask });

      this.body = null;
      this.headers = null;
    } catch (err) {
      res.status(err.status).send({ message: err.message });
    }
  };
}
