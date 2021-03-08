import { TaskBusinessDTO } from '../data-models/Business.model';

type Token = { token: string };

type BusinessAction<DTOType, ReturnType> = (
  DTO: DTOType
) => Promise<ReturnType>;

export type UserBusinessAction<DTOType> = BusinessAction<DTOType, Token>;
export type TaskBusinessAction<DTOType> = BusinessAction<
  TaskBusinessDTO,
  DTOType
>;
