import {
  AuthenticationData,
  DeleteTaskRequestInfos,
  TaskDatabaseAction,
  TaskDTO,
  TaskResponseInfos
} from '@models';
import { BaseDatabase } from '@services/BaseDatabase';
import { CustomError } from '@tools';
import { Env } from 'env-helper';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

@Service()
export class TaskDatabase extends BaseDatabase {
  private taskTableName = Env.TASK_TABLE_NAME;

  create: TaskDatabaseAction<TaskDTO, void> = async createTaskDTO => {
    try {
      const { id, list, ownerId, title, content } = createTaskDTO;
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
        'Failed to create card.'
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
        'Failed to get card list.'
      );
    }
  };

  update: TaskDatabaseAction<TaskDTO, number> = async updateTaskDTO => {
    const { id, list, title, content, ownerId } = updateTaskDTO;
    try {
      const connection = this.getConnection();

      const result = await connection(this.taskTableName)
        .update({ id, list, title, content })
        .where({ id, owner_id: ownerId });

      await this.destroyConnection();

      return result;
    } catch (err) {
      throw new CustomError(StatusCodes.NOT_MODIFIED, 'Failed to update card.');
    }
  };

  delete: TaskDatabaseAction<
    DeleteTaskRequestInfos,
    number
  > = async deleteTaskDTO => {
    const { id, ownerId } = deleteTaskDTO;
    try {
      const connection = this.getConnection();

      const result = await connection(this.taskTableName)
        .delete()
        .where({ id, owner_id: ownerId });

      await this.destroyConnection();

      return result;
    } catch (err) {
      throw new CustomError(StatusCodes.NOT_MODIFIED, 'Failed to delete card.');
    }
  };
}
