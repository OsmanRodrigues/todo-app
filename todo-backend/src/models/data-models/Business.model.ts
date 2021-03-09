import {
  CreateTaskRequestInfos,
  UpdateTaskRequestInfos
} from './Request.model';

export interface TaskBusinessDTO {
  authorization: string;
  taskInfos?: UpdateTaskRequestInfos | CreateTaskRequestInfos;
  taskId?: string;
}
