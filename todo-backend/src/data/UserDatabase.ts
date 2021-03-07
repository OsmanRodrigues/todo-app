import { BaseDatabase } from '@services/BaseDatabase';
import { SignupInput } from './models';

export class UserDatabase extends BaseDatabase {
  public async createUser(input: SignupInput): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: input.id,
          name: input.name,
          email: input.email,
          password: input.password
        })
        .into(process.env.USER_TABLE_NAME);
    } catch (e) {
      console.log('error: ', e);
      throw new Error('Failed to create user.');
    }
  }
}
