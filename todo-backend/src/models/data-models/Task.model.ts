export enum LIST {
  NEW = 'NEW',
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE'
}

export interface Task {
  title: string;
  content?: string;
  list: keyof typeof LIST;
}

export interface TaskDTO extends Task {
  id: string;
  ownerId: string;
}
