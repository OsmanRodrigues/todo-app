import jwt from 'jsonwebtoken';
import { Env } from 'env-helper';
import { AuthenticationData } from '@models/tools-models';
import { CustomError } from './CustomError';
import { Service } from 'typedi';
const { ACC_TOKEN_EXPIRES_IN, JWT_KEY } = Env;

@Service()
export class Authenticator {
  public generateToken(
    data: AuthenticationData,
    expiresIn: string = ACC_TOKEN_EXPIRES_IN
  ): { token: string } {
    const token = jwt.sign({ id: data.id }, JWT_KEY, { expiresIn });

    return { token: `Bearer ${token}` };
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, JWT_KEY) as AuthenticationData;
    const result = {
      id: payload.id,
      name: payload.name,
      email: payload.email
    };
    return result;
  }

  checkToken(token: string): void {
    try {
      if (!token) {
        throw new CustomError(400, 'Missing token.');
      } else if (!token.includes('.')) {
        throw new CustomError(400, 'Not a jwt token.');
      }
    } catch (error) {
      throw new CustomError(400, error.message);
    }
  }
}
