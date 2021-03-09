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

export interface UpdateTaskRequestInfos extends Task {
  id: string;
}

export interface DeleteTaskRequestInfos {
  id: string;
  ownerId: string;
}
