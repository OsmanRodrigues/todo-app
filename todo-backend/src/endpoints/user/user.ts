import { Response, Request } from 'express';
import { UserDatabase } from '@data/UserDatabase';
import { SignupRequestBody } from './models';

const useUserDataBase = new UserDatabase();

export const signup = async (req: Request, res: Response): Promise<void> => {
  const body: SignupRequestBody = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  console.log(body);
  const newId = 'user1'; // TODO: change this after uuid
  const hashedPwd = body.password + 'hashed';

  try {
    await useUserDataBase.createUser({
      id: newId,
      name: body.name,
      email: body.email,
      password: hashedPwd
    });

    const accessToken = 'Bearer tokenof' + body.name;

    res
      .send({
        message: `User ${body.name} successfully created!`,
        accessToken
      })
      .status(200);

    await useUserDataBase.destroyConnection();
  } catch (e) {
    res.send({ message: e.message }).status(400);
  }
};
