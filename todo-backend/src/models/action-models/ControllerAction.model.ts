import { Response, Request } from 'express';

export type ControllerAction = (
  request: Request,
  response: Response
) => Promise<void>;
