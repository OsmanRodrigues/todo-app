import { Task } from './Task.model';

export interface CreateTaskResponseInfos extends Task {
  id: string;
}

export interface GetTaskResponseInfos extends Task {
  id: string;
}
