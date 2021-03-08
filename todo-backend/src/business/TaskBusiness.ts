import { TaskDatabase } from '@data/TaskDatabase';
import { CreateTaskResponseInfos, TaskBusinessAction } from '@models';
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
      throw new CustomError(400, err.message);
    }
  };
}
