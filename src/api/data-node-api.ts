import instance from "@/lib/axios";

import { DataNode, NodeType } from "@/models/data-node";
export const getRootNode = (): Promise<DataNode> => {
  return instance.get<any, DataNode>("/nodeTree/root");
};

export const getChildNode = (
  dataSourceId: number,
  key: string,
  nodeType: NodeType,
): Promise<DataNode> => {
  return instance.get<any, DataNode>(`/nodeTree/child`, {
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
  return instance.get<any, DataNode>(`/nodeTree/refresh`, {
    params: {
      dataSourceId: dataSourceId,
      key: key,
      nodeType: nodeType,
    },
  });
};
