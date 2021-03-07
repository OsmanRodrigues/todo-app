import bcrypt from 'bcryptjs';
import { Env } from 'env-helper';
import { Service } from 'typedi';

@Service()
export class HashManager {
  public async hash(plainText: string): Promise<string> {
    const hash = await bcrypt.hash(
      plainText,
      await bcrypt.genSalt(Number(Env.BCRYPT_COST))
    );

    return hash;
  }

  public async checkHash(hash: string, plainText: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plainText, hash);

    return isValid;
  }
}
