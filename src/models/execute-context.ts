import { DataSourceType } from "@/models/datasource-type";
import { ObjectType } from "@/models/object-type";
import { ExecuteStatement } from "@/models/execute-statement";

export type ExecuteContext = {
  DataSourceType: DataSourceType;
  dataBaseName: string;
  schemaName: string;
  objectName: string;
  objectType: ObjectType;
  editorId: string;
  query: string;
  dataSourceId: string;
  limit: number;
  offset: number;
  parameters: any;
  statement: ExecuteStatement;
};
