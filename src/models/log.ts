import { DataSourceType } from "@/models/datasource-type";
type LogType = "EXECUTE" | "EVENT" | "";

type ExecuteLog = {
  statement: string;
};
type EventLog = {
  event: "OPEN CONNECTION" | "CLOSE CONNECTION";
};
type LogMap = {
  EXECUTE: ExecuteLog;
  EVENT: EventLog;
};
type Log<E extends keyof LogMap> = {
  id: string;
  type: LogType;
  time: string;
  content: LogMap[E];
  dataSourceType: DataSourceType;
  dataSourceId: string;
  databaseName: string;
  schemaName: string;
  objectType: string;
  objectName: string;
};
export type { Log, EventLog, ExecuteLog };
