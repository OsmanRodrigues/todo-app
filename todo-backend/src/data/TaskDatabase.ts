import { TaskDatabaseAction } from '@models/action-models/DatabaseAction.model';
import { TaskDTO } from '@models/data-models/Task.model';
import { BaseDatabase } from '@services/BaseDatabase';
import { CustomError } from '@tools';
import { Env } from 'env-helper';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

@Service()
export class TaskDatabase extends BaseDatabase {
  private taskTableName = Env.TASK_TABLE_NAME;

  create: TaskDatabaseAction<TaskDTO, void> = async taskDTO => {
    try {
      const { id, list, ownerId, title, content } = taskDTO;
      await this.getConnection()
        .insert({
          id,
          list,
          title,
          content,
          owner_id: ownerId
        })
        .into(this.taskTableName);

      await this.destroyConnection();
    } catch (err) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create task.'
      );
    }
  };
}
