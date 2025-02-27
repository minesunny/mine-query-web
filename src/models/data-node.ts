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
  ROOT = "ROOT",
  DATASOURCE = "DATASOURCE",
  DATABASE = "DATABASE",
  SCHEMA = "SCHEMA",
  TABLE_GROUP = "TABLE_GROUP",
  TABLE = "TABLE",
  COLUMN = "COLUMN",
}
