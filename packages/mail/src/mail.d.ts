import Client = require("@sendgrid/client");
import {ClientResponse} from "@sendgrid/client/src/response";
import {ResponseError} from "@sendgrid/helpers/classes";
import {MailData, MailJSON} from "@sendgrid/helpers/classes/mail";

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

declare class MailService {
  /**
   * API key pass through for convenience
   */
  setApiKey(apiKey: string): void;

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(left: string, right: string): void;

  /**
   * Send email
   */
  send(data: XOR<MailJSON, MailData>, isMultiple?: boolean, cb?: (err: Error|ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;

  /**
   * Send emails
   */
  send(data: XOR<MailJSON, MailData>[], isMultiple?: boolean, cb?: (err: Error|ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data: XOR<MailJSON, MailData>, cb?: (error: Error|ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
}

declare const mail: MailService & { MailService: MailService }
export = mail
