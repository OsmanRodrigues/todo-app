import { UserSignupDTO } from '@models/data-models/User.model';
import { AuthenticationData } from '@models/tools-models';
import { BaseDatabase } from '@services/BaseDatabase';
import { CustomError } from '@tools/CustomError';
import { Env } from 'env-helper';
import { StatusCodes } from 'http-status-codes';

export class UserDatabase extends BaseDatabase {
  public async createUser(userDTO: UserSignupDTO): Promise<AuthenticationData> {
    try {
      await this.getConnection()
        .insert({
          id: userDTO.id,
          name: userDTO.name,
          email: userDTO.email,
          password: userDTO.password
        })
        .into(Env.USER_TABLE_NAME);

      await this.destroyConnection();

      const { id, name, email } = userDTO;

      return {
        id,
        email,
        name
      };
    } catch (e) {
      console.log('error: ', e);
      throw new CustomError(StatusCodes.BAD_REQUEST, 'Failed to create user.');
    }
  }
}
