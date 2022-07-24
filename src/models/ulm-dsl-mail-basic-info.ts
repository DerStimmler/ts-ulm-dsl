import { UlmDslMailSender } from "./ulm-dsl-mail-sender";
import { UlmDslMailRecipient } from "./ulm-dsl-mail-recipient";

export interface UlmDslMailBasicInfo {
  /**
   * Email identifier.
   * @type {number}
   */
  id: number;

  /**
   * Subject of the email.
   * @type {string}
   */
  subject: string;

  /**
   * Uri to open mail in browser.
   * @type {string}
   */
  link: string;

  /**
   * Information about the recipient of the email.
   * @type {UlmDslMailRecipient}
   */
  recipient: UlmDslMailRecipient;

  /**
   * Information about the sender of the email.
   * @type {UlmDslMailSender}
   */
  sender: UlmDslMailSender;

  /**
   * Receiving time.
   * @type {Date}
   */
  date: Date;
}
