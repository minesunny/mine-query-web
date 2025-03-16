import instance from "@/lib/axios";

import { DataNode, NodeType } from "@/models/data-node";
import { DataSourceType } from "@/models/datasource-type";
export const getRootNode = (): Promise<DataNode> => {
  // return instance.get<any, DataNode>("/nodeTree/root");
  return new Promise<DataNode>((resolve) => {
    resolve({
      dataSourceId: 1,
      title: "SQLite",
      key: "SQLite",
      isLeaf: false,
      nodeType: NodeType.ROOT,
      dataSourceType: DataSourceType.SQLite,
      children: [{
        dataSourceId: 1,
        title: "SQLite",
        key: "SQLite",
        isLeaf: false,
        nodeType: NodeType.DATASOURCE,
        dataSourceType: DataSourceType.SQLite,
      }]
    });
  });
};

export const getChildNode = (
  dataSourceId: number,
  key: string,
  nodeType: NodeType,
): Promise<DataNode> => {
  return instance.get<any, DataNode>("/nodeTree/child", {
    params: {
      dataSourceId: dataSourceId,
      key: key,
      nodeType: nodeType,
    },
  });
};

export const refreshNode = (
  dataSourceId: number,
  key: string,
  nodeType: NodeType,
): Promise<DataNode> => {
  return instance.get<any, DataNode>("/nodeTree/refresh", {
    params: {
      dataSourceId: dataSourceId,
      key: key,
      nodeType: nodeType,
    },
  });
};
