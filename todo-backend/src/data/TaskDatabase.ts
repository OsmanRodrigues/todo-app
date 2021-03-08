import { AuthenticationData, TaskResponseInfos } from '@models';
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

  get: TaskDatabaseAction<
    AuthenticationData,
    TaskResponseInfos[]
  > = async authenticationDTO => {
    const { id } = authenticationDTO;
    try {
      const record: TaskResponseInfos[] = await this.getConnection()
        .select('id', 'title', 'content', 'list')
        .from(this.taskTableName)
        .where({ owner_id: id });

      await this.destroyConnection();
      return record;
    } catch (err) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to get task list.'
      );
    }
  };

  update: TaskDatabaseAction<TaskDTO, void> = async taskDTO => {
    const { id, list, title, content, ownerId } = taskDTO;
    try {
      const connection = this.getConnection();

      await connection(this.taskTableName)
        .update({ id, list, title, content })
        .where({ id, owner_id: ownerId });

      await this.destroyConnection();
    } catch (err) {
      throw new CustomError(StatusCodes.NOT_MODIFIED, 'Failed to update task.');
    }
  };
}
