import { TaskDatabase } from '@data/TaskDatabase';
import {
  CreateTaskResponseInfos,
  GetTaskResponseInfos,
  TaskBusinessAction
} from '@models';
import { TaskDTO } from '@models/data-models/Task.model';
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

  create: TaskBusinessAction<CreateTaskResponseInfos> = async createTaskDTO => {
    const { authorization, taskInfos } = createTaskDTO;
    try {
      const token = this.authenticator.getToken(authorization);
      this.authenticator.checkToken(token);
      const ownerId = this.authenticator.getData(token).id;
      const newId = this.idGenerator.generate();
      const taskDTO: TaskDTO = { ...taskInfos, ownerId, id: newId };

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

  get: TaskBusinessAction<GetTaskResponseInfos[]> = async getTaskDTO => {
    const { authorization } = getTaskDTO;
    try {
      const token = this.authenticator.getToken(authorization);
      const authenticationDTO = this.authenticator.getData(token);

      const databaseResult = await this.taskDatabase.get(authenticationDTO);

      return databaseResult;
    } catch (err) {
      throw new CustomError(err.status || StatusCodes.BAD_REQUEST, err.message);
    }
  };
}
