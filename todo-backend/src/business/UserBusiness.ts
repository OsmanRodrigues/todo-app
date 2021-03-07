import { UserDatabase } from '@data/UserDatabase';
import { SignupRequestBody } from '@models/data-models/Request.model';
import { Authenticator } from '@tools/Authenticator';
import { HashManager } from '@tools/HashManager';
import { IdGenerator } from '@tools/IdGenerator';

const useUserDataBase = new UserDatabase();

export class UserBusiness {
  signup = async (body: SignupRequestBody): Promise<{ token: string }> => {
    const newId = new IdGenerator().generate();
    const hashedPassword = await new HashManager().hash(body.password);
    const authenticationData = await useUserDataBase.createUser({
      id: newId,
      name: body.name,
      email: body.email,
      password: hashedPassword
    });
    const token = new Authenticator().generateToken(authenticationData);

    return token;
  };
}
