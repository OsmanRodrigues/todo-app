import jwt from 'jsonwebtoken';
import { AuthenticationData } from '@models/tools-models';
import { CustomError } from './CustomError';
import { Env } from 'env-helper';

const { ACC_TOKEN_EXPIRES_IN, JWT_KEY } = Env;

export class Authenticator {
  public generateAccessToken(
    input: AuthenticationData,
    expiresIn: string = ACC_TOKEN_EXPIRES_IN
  ): { accessToken: string } {
    const accessToken = jwt.sign(
      {
        id: input.id,
        role: input.role,
        device: input.device
      },
      JWT_KEY as string,
      { expiresIn }
    );
    return { accessToken };
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role
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
