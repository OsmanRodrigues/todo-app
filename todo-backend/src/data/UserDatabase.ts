import { Env } from 'env-helper';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import { AuthenticationData, FindUserDTO, UserDTO } from '@models';
import { BaseDatabase } from '@services/BaseDatabase';
import { CustomError } from '@tools/CustomError';
import { DatabaseAction } from '@models/action-models/DatabaseAction.model';

@Service()
export class UserDatabase extends BaseDatabase {
  private userTableName = Env.USER_TABLE_NAME;

  createUser: DatabaseAction<UserDTO, AuthenticationData> = async userDTO => {
    try {
      await this.getConnection()
        .insert({
          id: userDTO.id,
          name: userDTO.name,
          email: userDTO.email,
          password: userDTO.password
        })
        .into(this.userTableName);

      await this.destroyConnection();

      const { id, name, email } = userDTO;

      return {
        id,
        email,
        name
      };
    } catch (err) {
      console.log('error: ', err);
      throw new CustomError(StatusCodes.BAD_REQUEST, 'Failed to create user.');
    }
  };

  findUser: DatabaseAction<FindUserDTO, UserDTO[]> = async userDTO => {
    const { id, email } = userDTO;
    const queryField = id ? 'id' : 'email';
    const fieldValue = id || email;

    try {
      const result: UserDTO[] = await this.getConnection()
        .select('*')
        .from(this.userTableName)
        .where({ [queryField]: fieldValue });

      return result;
    } catch (err) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found.');
    }
  };
}
