import { UserDatabase } from '@data/UserDatabase';
import { SignupRequestBody } from '@models/data-models/Request.model';

const useUserDataBase = new UserDatabase();

export class UserBusiness {
  signup = async (body: SignupRequestBody): Promise<string> => {
    const newId = 'user1'; // TODO: change this after uuid
    const hashedPwd = body.password + 'hashed';

    await useUserDataBase.createUser({
      id: newId,
      name: body.name,
      email: body.email,
      password: hashedPwd
    });

    const accessToken = 'Bearer tokenof' + body.name;

    return accessToken;
  };
}
