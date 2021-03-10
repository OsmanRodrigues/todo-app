export enum LIST {
  'NEW',
  'TODO',
  'DOING',
  'DONE'
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
