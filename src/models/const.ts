import { DataSourceType } from "@/models/datasource-type";

const Encoding = ["UTF8", "GB2312"] as const;
const LineSplit = ["CRLF", "LF", "CR"] as const;
const LineSplitLiteral = {
  CRLF: "\\r\\n",
  LF: "\\n",
  CR: "\\r",
};
const timeZones = Intl.supportedValuesOf("timeZone") as string[]; // 让它变成 readonly 数组

type TimeZone = (typeof timeZones)[number]; // 取出数组的值作为联合类型
type DataSourceSimpleProps = {
  dataBaseName: string;
  username: string;
  schemaName: string;
  host: string;
  port: number;
};
const DefaultDataSourceProps: Record<DataSourceType, DataSourceSimpleProps> = {
  [DataSourceType.MySQL]: {
    dataBaseName: "MySQL",
    schemaName: "MySQL",
    host: "localhost",
    port: 3306,
    username: "root",
  },
  [DataSourceType.Oracle]: {
    dataBaseName: "MySQL",
    schemaName: "MySQL",
    host: "localhost",
    port: 3306,
    username: "root",
  },

  [DataSourceType.SQLServer]: {
    dataBaseName: "MySQL",
    schemaName: "MySQL",
    host: "localhost",
    port: 3306,
    username: "root",
  },
  [DataSourceType.PostgreSQL]: {
    dataBaseName: "postgres",
    schemaName: "public",
    host: "localhost",
    port: 3306,
    username: "postgres",
  },
  [DataSourceType.SQLite]: {
    dataBaseName: "main",
    schemaName: "main",
    host: "localhost",
    port: 3306,
    username: "",
  },
};
export { Encoding, LineSplit, LineSplitLiteral };
export type { TimeZone };
