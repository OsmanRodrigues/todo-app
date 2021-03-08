import { TaskDatabase } from '@data/TaskDatabase';
import {
  TaskResponseInfos,
  TaskBusinessAction,
  UpdateTaskRequestInfos
} from '@models';
import { LIST, TaskDTO } from '@models/data-models/Task.model';
import { Authenticator, CustomError, IdGenerator } from '@tools';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

@Service()
export class TaskBusiness {
  constructor(
    private authenticator: Authenticator,
    private idGenerator: IdGenerator,
    private taskDatabase: TaskDatabase
  ) {}

  private authorizationCheck = (authorization: string) => {
    const token = this.authenticator.getToken(authorization);
    this.authenticator.checkToken(token);
    const authenticationDTO = this.authenticator.getData(token);

    return authenticationDTO;
  };

  create: TaskBusinessAction<TaskResponseInfos> = async createTaskDTO => {
    const { authorization, taskInfos } = createTaskDTO;
    try {
      const authenticationDTO = this.authorizationCheck(authorization);
      const newId = this.idGenerator.generate();
      const taskDTO: TaskDTO = {
        ...taskInfos,
        ownerId: authenticationDTO.id,
        id: newId
      };

      await this.taskDatabase.create(taskDTO);

      return {
        id: taskDTO.id,
        title: taskDTO.title,
        list: taskDTO.list,
        content: taskDTO.content || ''
      };
    } catch (err) {
      throw new CustomError(err.status || StatusCodes.BAD_REQUEST, err.message);
    }
  };

  get: TaskBusinessAction<TaskResponseInfos[]> = async getTaskDTO => {
    const { authorization } = getTaskDTO;
    try {
      const authenticationDTO = this.authorizationCheck(authorization);

      const databaseResult = await this.taskDatabase.get(authenticationDTO);

      return databaseResult;
    } catch (err) {
      throw new CustomError(err.status || StatusCodes.BAD_REQUEST, err.message);
    }
  };

  update: TaskBusinessAction<TaskResponseInfos> = async updateTaskDTO => {
    const { authorization } = updateTaskDTO;
    const taskInfos = updateTaskDTO.taskInfos as UpdateTaskRequestInfos;

    if (!LIST[taskInfos.list]) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        `Invalid list name. Values accepted: ${Object.keys(LIST)}.`
      );
    }

    try {
      const authenticationDTO = this.authorizationCheck(authorization);

      await this.taskDatabase.update({
        ...taskInfos,
        ownerId: authenticationDTO.id
      });

      return taskInfos;
    } catch (err) {
      throw new CustomError(err.status || StatusCodes.BAD_REQUEST, err.message);
    }
  };
}
