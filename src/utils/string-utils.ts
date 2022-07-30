import utf8 from "quoted-printable";

/** @internal */
export const decodeQuotedPrintable = (text: string) => {
  return utf8.decode(text).trim();
};
