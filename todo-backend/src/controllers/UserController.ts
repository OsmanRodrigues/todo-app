import { Response, Request } from 'express';
import { SignupRequestBody } from '@models/data-models/Request.model';
import { UserBusiness } from '@business/UserBusiness';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '@tools/CustomError';

const userBusiness = new UserBusiness();

export class UserController {
  signup = async (req: Request, res: Response): Promise<void> => {
    const body: SignupRequestBody = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    try {
      Object.keys(body).forEach(key => {
        const userInfo = body[key as keyof SignupRequestBody];

        if (key !== 'name' && !userInfo) {
          throw new CustomError(
            StatusCodes.BAD_REQUEST,
            `User ${key} required.`
          );
        }
      });

      const businessResponse = await userBusiness.signup(body);

      res.status(StatusCodes.CREATED).send({
        message: `User ${body.name || body.email} successfully created!`,
        token: businessResponse.token
      });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
    }
  };
}
