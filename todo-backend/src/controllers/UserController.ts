import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import { UserBusiness } from '@business/UserBusiness';
import { CustomError } from '@tools/CustomError';
import {
  ControllerAction,
  LoginResquestInfos,
  SignupRequestInfos
} from '@models';

@Service()
export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  private body: SignupRequestInfos | LoginResquestInfos;

  private checkRequestInfos = <InfosModel>(infos: InfosModel) => {
    Object.keys(infos).forEach(key => {
      const userInfo = infos[key as keyof InfosModel];

      if (key !== 'name' && !userInfo) {
        throw new CustomError(StatusCodes.BAD_REQUEST, `User ${key} required.`);
      }
    });
  };

  signup: ControllerAction = async (req, res) => {
    this.body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    try {
      this.checkRequestInfos(this.body);

      const businessValidation = await this.userBusiness.signup(this.body);

      res.status(StatusCodes.CREATED).send({
        message: `User ${
          this.body.name || this.body.email
        } successfully created!`,
        token: businessValidation.token
      });
    } catch (err) {
      res.status(err.status).send({ message: err.message });
    }
  };

  login: ControllerAction = async (req, res) => {
    this.body = {
      email: req.body.email,
      password: req.body.password
    };

    try {
      this.checkRequestInfos(this.body);

      const businessValidation = await this.userBusiness.login(this.body);

      res.status(StatusCodes.OK).send({ token: businessValidation.token });
    } catch (err) {
      res.status(err.status).send({ message: err.message });
    }
  };
}
