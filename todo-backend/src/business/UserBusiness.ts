import { UserDatabase } from '@data/UserDatabase';
import { SignupRequestBody } from '@models/data-models/Request.model';
import { Authenticator, HashManager, IdGenerator } from '@tools';

import { Service } from 'typedi';

@Service()
export class UserBusiness {
  constructor(
    private authenticator: Authenticator,
    private hashManager: HashManager,
    private idGenerator: IdGenerator,
    private userDatabase: UserDatabase
  ) {}

  signup = async (body: SignupRequestBody): Promise<{ token: string }> => {
    const newId = this.idGenerator.generate();
    const hashedPassword = await this.hashManager.hash(body.password);
    const authenticationData = await this.userDatabase.createUser({
      id: newId,
      name: body.name,
      email: body.email,
      password: hashedPassword
    });
    const token = this.authenticator.generateToken(authenticationData);

    return token;
  };
}
