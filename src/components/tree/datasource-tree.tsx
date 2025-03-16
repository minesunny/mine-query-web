//use client
import React, { useEffect, useRef, useState } from "react";
import "./theme.css";
import Tree from "rc-tree";
import { DataNode, NodeType } from "@/models/data-node";
import { getChildNode, getRootNode, refreshNode } from "@/api/data-node-api";
import { Menu } from "@/models/menu";
import { menuApi, useMenuApi } from "@/api/menu-api";
import { contextMenu } from "@/lib/utils";
import { DataSourceSVG, NodeSVG, SVG } from "@/components/ui/Icons";
import { GenericContextMenu } from "../ui/context-menu/generic-context-menu";
import { Button, SVGButton } from "../ui/button/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
const OBJECT_SVG = {
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
  // node.icon = <NodeSVG node={node.nodeType} dataSource={node.dataSourceType} />;
  node.icon = (
    <NodeSVG node={NodeType.COLUMN} dataSource={node.dataSourceType} />
  );
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
    <ScrollArea className={"h-full w-full"}>
      <div className={"h-full w-full min-w-[250px]"}>
        <GenericContextMenu ref={contextMenuRef} menu={menu} />
        <div id="dataSourceBar" className={"h-16 w-full border-primary"}>
          <div
            id="title"
            className={
              "h-8 w-full border-b border-primary font-inter text-small leading-8 flex justify-between"
            }
          >
            <div className="indent-8">数据库资源管理器</div>
            <div className={"flex items-center"}>
              <SVGButton name={"remove"} variant="secondary" />
            </div>
          </div>
          <div
            id="bar"
            className={"h-8 w-full border-b border-primary flex items-center"}
          >
            <SVGButton name="add" variant="secondary" />
            <SVGButton name="manageDataSources" variant="secondary" />
            <SVGButton name="refresh" variant="secondary" />
            <SVGButton name="runStop" variant="secondary" />
            <SVGButton name="show" variant="secondary" />
          </div>
        </div>
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
                className={"flex items-center h-5"}
                onContextMenu={(e) => {
                  contextMenu(e, contextMenuRef);
                  e.preventDefault();
                }}
              >
                <span className="font-inter text-default">{node.title}</span>
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
            return data.expanded ? (
              <SVG name={"chevronDown"} height="16px" width="16px" />
            ) : (
              <SVG name={"chevronRight"} height="16px" width="16px" />
            );
          }}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
export default DataSourceTree;
