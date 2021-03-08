import { UserDatabase } from '@data/UserDatabase';
import { BusinessAction, FindUserDTO } from '@models';
import { SignupRequestBody } from '@models/data-models/Request.model';
import { Authenticator, CustomError, HashManager, IdGenerator } from '@tools';
import { StatusCodes } from 'http-status-codes';

import { Service } from 'typedi';

@Service()
export class UserBusiness {
  constructor(
    private authenticator: Authenticator,
    private hashManager: HashManager,
    private idGenerator: IdGenerator,
    private userDatabase: UserDatabase
  ) {}

  private checkIfUserAlreadyExists = async (param: FindUserDTO) => {
    const databaseResult = await this.userDatabase.findUser(param);

    if (databaseResult.length) {
      throw new CustomError(
        StatusCodes.NOT_ACCEPTABLE,
        'User e-mail or id already used.'
      );
    }
  };

  signup: BusinessAction<SignupRequestBody> = async userDTO => {
    const { email, name, password } = userDTO;

    const newId = this.idGenerator.generate();
    const hashedPassword = await this.hashManager.hash(password);

    await this.checkIfUserAlreadyExists({ email });

    const authenticationData = await this.userDatabase.createUser({
      id: newId,
      name,
      email,
      password: hashedPassword
    });
    const token = this.authenticator.generateToken(authenticationData);

    return token;
  };
}
