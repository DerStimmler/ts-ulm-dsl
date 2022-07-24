import utf8 from "quoted-printable";

export const decodeQuotedPrintable = (text: string) => {
  return utf8.decode(text).trim();
};
