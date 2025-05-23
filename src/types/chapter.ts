import { Problem } from './problem';

export interface Chapter {
  _id: string;
  title: string;
  description: string;
  problems: Problem[];
}
