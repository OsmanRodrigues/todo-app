import { Service } from 'typedi';
import { v4 } from 'uuid';

@Service()
export class IdGenerator {
  public generate(): string {
    return v4();
  }
}
