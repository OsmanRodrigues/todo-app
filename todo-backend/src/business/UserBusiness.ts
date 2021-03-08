import { UserDatabase } from '@data/UserDatabase';
import { BusinessAction } from '@models';
import {
  LoginResquestInfos,
  SignupRequestInfos
} from '@models/data-models/Request.model';
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

  signup: BusinessAction<SignupRequestInfos> = async userDTO => {
    const { email, name, password } = userDTO;

    const newId = this.idGenerator.generate();
    const hashedPassword = await this.hashManager.hash(password);
    const databaseResult = await this.userDatabase.findUser({ email });

    if (databaseResult.length) {
      throw new CustomError(
        StatusCodes.NOT_ACCEPTABLE,
        'User e-mail already used.'
      );
    }

    const authenticationData = await this.userDatabase.createUser({
      id: newId,
      name,
      email,
      password: hashedPassword
    });
    const token = this.authenticator.generateToken(authenticationData);

    return token;
  };

  login: BusinessAction<LoginResquestInfos> = async userDTO => {
    const { email, password } = userDTO;
    const databaseResult = await this.userDatabase.findUser({ email });

    if (!databaseResult.length) {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found.');
    }
    const userRecord = databaseResult[0];
    const passwordIsValid = await this.hashManager.checkHash(
      userRecord.password,
      password
    );

    if (!passwordIsValid) {
      throw new CustomError(StatusCodes.NOT_ACCEPTABLE, 'Wrong password.');
    }

    const token = this.authenticator.generateToken(userRecord);

    return token;
  };
}
