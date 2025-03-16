import { Dict } from "@/models/dict";
import { DataSourceType } from "@/models/datasource-type";

export type DataNode = {
  dataSourceId: number;
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
  data?: Dict;
  nodeType: NodeType;
  icon?: any;
  dataSourceType: DataSourceType;
};

export enum NodeType {
  DATASOURCE = "DATASOURCE",
  DATABASE = "DATABASE",
  SCHEMA = "SCHEMA",
  TABLE_GROUP = "TABLE_GROUP",
  TABLE = "TABLE",
  VIEW_GROUP = "VIEW_GROUP",
  VIEW = "VIEW",
  COLUMN_GROUP = "COLUMN_GROUP",
  COLUMN = "COLUMN",
}
