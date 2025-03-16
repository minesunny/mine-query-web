import { useTheme } from "next-themes";
import React from "react";
import { DataSourceType, ObjectType } from "@/models";
import { NodeType } from "@/models/data-node";

const requireAll = (
  requireContext: ReturnType<typeof require.context>,
): unknown[] => {
  return requireContext.keys().map(requireContext);
};

const req = require.context("/public/icons", true, /\.svg$/);
requireAll(req);

export const SVG: React.FC<{
  name: string;
  height?: string;
  width?: string;
}> = ({ name, height, width }) => {
  const theme = useTheme();
  if (!height) {
    height = "1em";
  }
  if (!width) {
    width = "1em";
  }
  return (
    <svg height={height} width={width}>
      <use xlinkHref={"#" + name + `_${theme.resolvedTheme}`} />
    </svg>
  );
};

export const ObjectSVG: React.FC<{
  object: ObjectType;
}> = ({ object }) => {
  let svgName = "";
  switch (object) {
    case "DATABASE":
      svgName = "databaseLink";
      break;
    case "SCHEMA":
      svgName = "schema";
      break;
    case "TABLE":
      svgName = "table";
      break;
    case "VIEW":
      svgName = "view";
      break;
    case "COLUMN":
      svgName = "column";
      break;
  }
  return <SVG name={svgName} height="16px" width="16px" />;
};

export const NodeSVG: React.FC<{
  node: NodeType;
  dataSource?: DataSourceType;
}> = ({ node, dataSource }) => {
  let svgName = "";
  switch (node) {
    case "COLUMN_GROUP":
    case "VIEW_GROUP":
    case "TABLE_GROUP":
      svgName = "sourceRoot";
      break;
    case "DATABASE":
      svgName = "databaseLink";
      break;
    case "SCHEMA":
      svgName = "schema";
      break;
    case "TABLE":
      svgName = "table";
      break;
    case "VIEW":
      svgName = "view";
      break;
    case "COLUMN":
      svgName = "column";
      break;
  }

  if (node === NodeType.DATASOURCE && dataSource) {
    return <DataSourceSVG dataSource={dataSource} />;
  }
  return <SVG name={svgName} height="16px" width="16px" />;
};

export const DataSourceSVG: React.FC<{
  dataSource: DataSourceType;
}> = ({ dataSource }) => {
  let svgName = "";
  switch (dataSource) {
    case "MySQL":
      svgName = "database";
      break;
    case "SQLite":
      svgName = "sqlite";
      break;
  }
  return <SVG name={svgName} height="16px" width="16px" />;
};
