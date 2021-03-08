import { Task } from './Task.model';

interface Credentials {
  email: string;
  password: string;
}

export interface SignupRequestInfos extends Credentials {
  name?: string;
}

export type LoginResquestInfos = Credentials;

export type CreateTaskRequestInfos = Task;
