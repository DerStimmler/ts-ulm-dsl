import { UlmDslService } from "./ulm-dsl-service";
import { UlmDslMailBasicInfo } from "./models";
import { UlmDslMailRecipient } from "./models";
import { UlmDslMailSender } from "./models";
import { decodeQuotedPrintable } from "./utils/string-utils";
import { UlmDslMail } from "./models";

export class UlmDslClient {
  private _service: UlmDslService;

  constructor() {
    this._service = new UlmDslService();
  }

  /**
   * Get all emails with all available information for a given inbox name.
   * @param {string} name inbox name (everything before @ulm-dsl.de)
   * @returns {UlmDslMail[]} List of emails with all available information.
   */
  public async getMails(name: string): Promise<UlmDslMail[]> {
    if (!name) throw new Error("Invalid name.");

    const mailInfos = await this.getInbox(name);

    const mails: UlmDslMail[] = [];

    for await (const mailInfo of mailInfos) {
      const feed = await this._service.fetchMailFeed(name, mailInfo.id);

      const entry = feed.entry[0];

      mails.push({
        id: entry.id,
        link: entry.link.href,
        subject: entry.title,
        date: new Date(entry.updated),
        recipient: mailInfo.recipient,
        sender: mailInfo.sender,
        body: this.extractBodyFromContent(entry.content.CDATA),
      });
    }

    return mails;
  }

  /**
   * Gets a specific email with all available information based on inbox name and email identifier.
   * @param {string} name inbox name (everything before @ulm-dsl.de)
   * @param {string} id identifier of email
   * @returns {UlmDslMail | null} Specific email with all available information.
   */
  public async getMailById(
    name: string,
    id: number
  ): Promise<UlmDslMail | null> {
    if (!name) throw new Error("Invalid name.");

    const mailInfos = await this.getInbox(name);

    const mailInfo = mailInfos.find((mail) => mail.id === id);

    if (!mailInfo) return null;

    const feed = await this._service.fetchMailFeed(name, id);

    if (feed.entry.length === 0) return null;

    const entry = feed.entry[0];

    return {
      id: entry.id,
      link: entry.link.href,
      subject: entry.title,
      date: new Date(entry.updated),
      recipient: mailInfo.recipient,
      sender: mailInfo.sender,
      body: this.extractBodyFromContent(entry.content.CDATA),
    };
  }

  /**
   * Get basic information except body of all emails for a given inbox name.
   * @param {string} name inbox name (everything before @ulm-dsl.de)
   * @returns {UlmDslMailBasicInfo[]} List of emails with basic information except body.
   */
  public async getInbox(name: string): Promise<UlmDslMailBasicInfo[]> {
    if (!name) throw new Error("Invalid name.");

    const feed = await this._service.fetchInboxFeed(name);

    return feed.entry.map((entry) => ({
      id: entry.id,
      link: entry.link.href,
      subject: entry.title,
      date: this.extractDateFromSummary(entry.summary.CDATA),
      recipient: this.extractRecipientFromSummary(entry.summary.CDATA),
      sender: this.extractSenderFromSummary(entry.summary.CDATA),
    }));
  }

  private extractDateFromSummary(summary: string): Date {
    const regex = new RegExp("date => (?<date>.+)\\n");
    const match = regex.exec(summary);
    const date = match?.groups?.date || "";

    return new Date(date);
  }

  private extractRecipientFromSummary(summary: string): UlmDslMailRecipient {
    const regex = new RegExp(
      "to => =\\?utf-8\\?Q\\?(?<displayName>.+)\\?= <(?<email>.+)>"
    );
    const match = regex.exec(summary);
    const displayName = decodeQuotedPrintable(match?.groups?.displayName || "");
    const email = decodeQuotedPrintable(match?.groups?.email || "");

    return { displayName, email };
  }

  private extractSenderFromSummary(summary: string): UlmDslMailSender {
    const regex = new RegExp(
      "from => =\\?utf-8\\?Q\\?(?<displayName>.+)\\?= <(?<email>.+)>"
    );
    const match = regex.exec(summary);
    const displayName = decodeQuotedPrintable(match?.groups?.displayName || "");
    const email = decodeQuotedPrintable(match?.groups?.email || "");

    return { displayName, email };
  }

  private extractBodyFromContent(content: string) {
    return content.trim();
  }
}
