import { Entry } from "./entry";
import { Author } from "./author";

/** @internal */
export interface Feed {
  author: Author;
  title: string;
  id: string;
  updated: Date;
  entry: Entry[];
}
