import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import { UserBusiness } from '@business/UserBusiness';
import { CustomError } from '@tools/CustomError';
import { ControllerAction, SignupRequestBody } from '@models';

@Service()
export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  signup: ControllerAction = async (req, res): Promise<void> => {
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

      const businessValidation = await this.userBusiness.signup(body);

      res.status(StatusCodes.CREATED).send({
        message: `User ${body.name || body.email} successfully created!`,
        token: businessValidation.token
      });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
    }
  };
}
