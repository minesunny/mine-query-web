import { RowColumn } from "./column";
import { DataSourceType } from "./datasource-type";
import { ObjectType } from "./object-type";
import { RowValue } from "./value";

type ExecuteStatement = {
  statement: string;
};

type ExecuteResult = {
  executeContext: ExecuteContext;
  items: ExecuteResultItem[];
};

type ExecuteResultItem = {
  statement: ExecuteStatement;
  columns: RowColumn;
  values: RowValue[];
};

type ExecuteContext = {
  dataSourceType: DataSourceType;
  dataBaseName: string;
  schemaName: string;
  objectName: string;
  objectType: ObjectType;
  editorId: string;
  query: string;
  dataSourceId: string;
  limit: number;
  offset: number;
  statement: ExecuteStatement;
};

export type { ExecuteStatement, ExecuteResult, ExecuteResultItem, ExecuteContext };