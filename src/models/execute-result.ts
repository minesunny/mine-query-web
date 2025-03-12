import { DataSourceType } from "@/models/datasource-type";
import { ExecuteContext } from "@/models/execute-context";
import { ColumnInfo } from "@/models/column-info";
import { ExecuteStatement } from "@/models/execute-statement";

export type ExecuteResult = {
  executeContext: ExecuteContext;
  items: ExecuteResultItem[];
};

export type ExecuteResultItem = {
  statement: ExecuteStatement;
  columns: ColumnInfo[];
  values: any[][];
};
