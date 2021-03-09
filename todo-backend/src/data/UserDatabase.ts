import { Env } from 'env-helper';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import {
  AuthenticationData,
  FindUserDTO,
  UserDatabaseAction,
  UserDTO
} from '@models';
import { BaseDatabase } from '@services/BaseDatabase';
import { CustomError } from '@tools/CustomError';

@Service()
export class UserDatabase extends BaseDatabase {
  private userTableName = Env.USER_TABLE_NAME;

  createUser: UserDatabaseAction<
    UserDTO,
    AuthenticationData
  > = async userDTO => {
    try {
      await this.getConnection().insert(userDTO).into(this.userTableName);

      await this.destroyConnection();

      const { id, name, email } = userDTO;

      return {
        id,
        email,
        name
      };
    } catch (err) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create user.'
      );
    }
  };

  findUser: UserDatabaseAction<FindUserDTO, UserDTO[]> = async userDTO => {
    const { id, email } = userDTO;
    const queryField = id ? 'id' : 'email';
    const fieldValue = id || email;

    try {
      const result: UserDTO[] = await this.getConnection()
        .select('*')
        .from(this.userTableName)
        .where({ [queryField]: fieldValue });

      await this.destroyConnection();

      return result;
    } catch (err) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found.');
    }
  };
}
