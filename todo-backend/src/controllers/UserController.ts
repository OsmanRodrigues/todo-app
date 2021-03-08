import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import { UserBusiness } from '@business/UserBusiness';
import { CustomError } from '@tools/CustomError';
import {
  UserControllerAction,
  LoginResquestInfos,
  SignupRequestInfos
} from '@models';

@Service()
export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  private body: SignupRequestInfos | LoginResquestInfos;

  private checkRequestInfos = (
    body: SignupRequestInfos | LoginResquestInfos
  ) => {
    const bodyProperties = Object.keys(body);

    if (!bodyProperties.length) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        'This request requires a body.'
      );
    }

    Object.keys(body).forEach(key => {
      const userInfo = body[key as keyof typeof body];

      if (key !== 'name' && !userInfo) {
        throw new CustomError(StatusCodes.BAD_REQUEST, `User ${key} required.`);
      }
    });
  };

  signup: UserControllerAction = async (req, res) => {
    try {
      this.body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };
      this.checkRequestInfos(this.body);

      const businessValidation = await this.userBusiness.signup(this.body);

      res.status(StatusCodes.CREATED).send({
        message: `User ${
          this.body.name || this.body.email
        } successfully created!`,
        token: businessValidation.token
      });

      this.body = null;
    } catch (err) {
      const { status, message } = err;

      res.status(status).send({ message });
    }
  };

  login: UserControllerAction = async (req, res) => {
    try {
      this.body = {
        email: req.body.email,
        password: req.body.password
      };
      this.checkRequestInfos(this.body);

      const businessValidation = await this.userBusiness.login(this.body);

      res.status(StatusCodes.OK).send({ token: businessValidation.token });

      this.body = null;
    } catch (err) {
      const { status, message } = err;

      res.status(status).send({ message });
    }
  };
}
