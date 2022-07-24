import { Entry } from "./entry";
import { Author } from "./author";

export interface Feed {
  author: Author;
  title: string;
  id: string;
  updated: Date;
  entry: Entry[];
}
