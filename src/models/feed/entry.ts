import { Content } from "./content";
import { Summary } from "./summary";
import { Link } from "./link";

/** @internal */
export interface Entry {
  title: string;
  link: Link;
  id: number;
  updated: string;
  summary: Summary;
  content: Content;
}
