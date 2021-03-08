import { Response, Request } from 'express';

type ControllerAction = (request: Request, response: Response) => Promise<void>;

export type UserControllerAction = ControllerAction;

export type TaskControllerAction = ControllerAction;
