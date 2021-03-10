export enum LIST {
  'NEW',
  'TODO',
  'DOING',
  'DONE'
}

export interface CardDTO {
  id: string;
  title: string;
  content?: string;
  list: keyof typeof LIST;
}

export interface CardActions {
  onDelete?: () => void;
  onEdit?: () => void;
  toNext?: () => void;
  toPrevious?: () => void;
}
