import { CreateTaskRequestInfos } from './Request.model';

export interface TaskBusinessDTO {
  authorization: string;
  taskInfos?: CreateTaskRequestInfos;
}
