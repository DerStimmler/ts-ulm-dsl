import { UlmDslMailBasicInfo } from "./ulm-dsl-mail-basic-info";

export interface UlmDslMail extends UlmDslMailBasicInfo {
  /**
   * Content of the email.
   * @type {string}
   */
  body: string;
}
