export enum LIST {
  'NEW',
  'TODO',
  'DOING',
  'DONE'
}

export interface User {
  email: string;
  password: string;
}

export interface Card {
  title: string;
  list: keyof typeof LIST;
  content?: string;
}

export interface CardDTO extends Card {
  id: string;
}

export interface CardActions {
  onDelete?: () => void;
  onEdit?: () => void;
  toNext?: () => void;
  toPrevious?: () => void;
}

export interface Authorization {
  message?: string;
  token: string;
}

export interface CreateCard {
  createdTask: CardDTO;
}

export interface UpdatedCard {
  updatedTask: CardDTO;
}

export interface GetCardList {
  tasks: CardDTO[];
}

export interface AuthenticatedResponse<ParamType> {
  data: ParamType;
}
