//use client
import React, { useEffect, useRef, useState } from "react";
import "./theme.css";
import Tree from "rc-tree";
import { DataNode, NodeType } from "@/models/data-node";
import { getChildNode, getRootNode, refreshNode } from "@/api/data-node-api";
import { Menu } from "@/models/menu";
import { menuApi, useMenuApi } from "@/api/menu-api";
import { contextMenu } from "@/lib/utils";
import { SVG } from "@/components/ui/Icons";
import { GenericContextMenu } from "../ui/context-menu/generic-context-menu";
const OBJECT_ICONS = {
  ROOT: <SVG name={"DataBase"} />,
  DATASOURCE: <SVG name={"DataBase"} />,
  DATABASE: <SVG name={"DataBase"} />,
  SCHEMA: <SVG name={"Schema"} />,
  TABLE_GROUP: <SVG name={"ObjectGroup"} />,
  TABLE: <SVG name={"Table"} />,
  VIEWS_GROUP: <SVG name={"ObjectGroup"} />,
  COLUMN_GROUP: <SVG name={"ObjectGroup"} />,
  COLUMN: <SVG name={"Column"} />,
};

const updateTreeData = (list: DataNode[], result: DataNode): DataNode[] =>
  list.map((node) => {
    if (node.key === result.key) {
      return {
        ...node,
        children: result.children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, result),
      };
    }
    return node;
  });
const clearTreeData = (list: DataNode[], key: string): DataNode[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children: [],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: clearTreeData(node.children, key),
      };
    }
    return node;
  });
const getChildNodeKeys = (data: DataNode[]) => {
  let temp: string[] = [];
  const loop = (data: DataNode[]) => {
    data.map((item) => {
      temp.push(item.key);
      if (item.children && item.children.length) {
        loop(item.children);
      }
    });
  };
  loop(data);
  return temp;
};

const handleIcons = (node: DataNode) => {
  if (node.nodeType === NodeType.DATASOURCE && node.dataSourceType) {
    node.icon = <SVG name={node.dataSourceType} />;
  } else if (node.nodeType) {
    node.icon = OBJECT_ICONS[node.nodeType];
  }
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      handleIcons(node.children[i]);
    }
  }
};

const DataSourceTree: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [loadedKeys, setLoadedKeys] = useState<string[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<Menu[]>();
  useEffect(() => {
    getRootNode().then((data) => {
      handleIcons(data);
      data?.children && setTreeData(data.children);
    });
    if (!divRef.current) {
      return;
    }
    const element = divRef.current;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setTreeHeight(entry.contentRect.height);
      }
    });
    return () => observer.observe(element);
  }, []);

  const onLoadData = (data: DataNode, isRefresh?: boolean) =>
    new Promise<void>((resolve) => {
      if (data.children && !isRefresh) {
        resolve();
        return;
      }
      setTimeout(() => {
        let promise: Promise<DataNode>;
        if (isRefresh) {
          if (data.children) {
            const keys = getChildNodeKeys(data.children);
            setLoadedKeys((origin) => {
              return origin!.filter((item) => !keys.includes(item));
            });
            setExpandedKeys((origin) => {
              return origin!.filter((item) => !keys.includes(item));
            });
          }
          setTreeData((origin) => clearTreeData(origin!, data.key));
          promise = refreshNode(data.dataSourceId, data.key, data.nodeType);
        } else {
          promise = getChildNode(data.dataSourceId, data.key, data.nodeType);
        }
        promise.then((result) => {
          handleIcons(result);
          setTreeData((origin) => updateTreeData(origin!, result));
        });
        resolve();
      }, 150);
    });
  const onExpand = (keys: React.Key[]) => {
    setExpandedKeys(keys as string[]);
    let newLoadedKeys = loadedKeys;
    if (expandedKeys.length > keys.length) {
      newLoadedKeys = loadedKeys.filter((item) => keys.includes(item));
    }
    setLoadedKeys(newLoadedKeys);
  };
  const onLoad = (keys: React.Key[]) => {
    setLoadedKeys(keys as string[]);
  };
  const [treeHeight, setTreeHeight] = useState<number>(0);

  return (
    <div className={"h-full w-full"}>
      <GenericContextMenu ref={contextMenuRef} menu={menu} />
      <Tree
        height={treeHeight}
        onRightClick={({ event, node }) => {
          node.nodeType = NodeType.DATASOURCE;
          menuApi.getMenu(node).then((menu) => {
            setMenu(menu);
          });
        }}
        loadData={onLoadData}
        treeData={treeData}
        defaultExpandAll={true}
        expandedKeys={expandedKeys}
        loadedKeys={loadedKeys}
        onLoad={onLoad}
        titleRender={(node) => {
          return (
            <div
              className={"flex items-center"}
              onContextMenu={(e) => {
                contextMenu(e, contextMenuRef);
                e.preventDefault();
              }}
            >
              {node.icon}
              <span>{node.title}</span>
            </div>
          );
        }}
        virtual={true}
        itemHeight={20}
        onExpand={onExpand}
        switcherIcon={(data) => {
          if (data.isLeaf) {
            return false;
          }
          // return data.expanded ? (
          //   // <Icons name={"TreeExpended"} />
          // ) : (
          //   // <Icons name={"TreeClosed"} />
          // );
        }}
      />
    </div>
  );
};
export default DataSourceTree;
