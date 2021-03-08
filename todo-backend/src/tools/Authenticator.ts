import jwt from 'jsonwebtoken';
import { Env } from 'env-helper';
import { AuthenticationData } from '@models/tool-models';
import { CustomError } from './CustomError';
import { Service } from 'typedi';
import { StatusCodes } from 'http-status-codes';
const { ACC_TOKEN_EXPIRES_IN, JWT_KEY } = Env;

@Service()
export class Authenticator {
  private tokenPrefix = 'Bearer ';

  generateToken = (
    data: AuthenticationData,
    expiresIn: string = ACC_TOKEN_EXPIRES_IN
  ): { token: string } => {
    const token = jwt.sign({ id: data.id }, JWT_KEY, { expiresIn });

    return { token: `${this.tokenPrefix} ${token}` };
  };

  getData = (token: string): AuthenticationData => {
    const payload = jwt.verify(token, JWT_KEY, {}) as AuthenticationData;
    const result = {
      id: payload.id,
      name: payload.name,
      email: payload.email
    };

    return result;
  };

  getToken = (authorization: string): string => {
    const replacedToken = authorization.replace(this.tokenPrefix, '');

    return replacedToken.trim();
  };

  checkToken(token: string): void {
    try {
      if (!token) {
        throw new CustomError(StatusCodes.BAD_REQUEST, 'Missing token.');
      } else if (!token.includes('.')) {
        throw new CustomError(StatusCodes.NOT_ACCEPTABLE, 'Not a jwt token.');
      }
    } catch (err) {
      throw new CustomError(err.status, err.message);
    }
  }
}
