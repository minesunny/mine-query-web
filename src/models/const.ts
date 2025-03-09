const Encoding = ["UTF8", "GB2312"] as const;
const LineSplit = ["CRLF", "LF", "CR"] as const;
const LineSplitLiteral = {
  CRLF: "\\r\\n",
  LF: "\\n",
  CR: "\\r",
};
export { Encoding, LineSplit, LineSplitLiteral };
