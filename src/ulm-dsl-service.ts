import axios from "axios";
import { ApiAddresses } from "./utils/api-addresses";
import { XMLParser } from "fast-xml-parser";
import { Feed } from "./models/feed";

export class UlmDslService {
  private _parse: XMLParser;

  constructor() {
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: "",
      cdataPropName: "CDATA",
    };

    this._parse = new XMLParser(options);
  }

  fetchMailFeed(name: string, id: number): Promise<Feed> {
    const uri = ApiAddresses.mailApi(name, id);

    return this.fetchFeed(uri);
  }

  fetchInboxFeed(name: string): Promise<Feed> {
    const uri = ApiAddresses.inboxApi(name);

    return this.fetchFeed(uri);
  }

  private async fetchFeed(uri: string): Promise<Feed> {
    const response = await axios.get<string>(uri);

    const content = response.data;

    if (response.status !== 200) throw new Error(content);

    const feed = this._parse.parse(content).feed;

    if (!Array.isArray(feed.entry)) {
      if (feed.entry.summary.CDATA) feed.entry = [feed.entry];
      else feed.entry = [];
    }

    return feed as Feed;
  }
}
