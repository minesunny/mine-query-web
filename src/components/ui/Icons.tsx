import React from "react";
import SQLiteLight from "@public/icons/database/SQLiteLight.svg";
import SQLiteDark from "@public/icons/database/SQLiteDark.svg";
import DataBaseLight from "@public/icons/database/DataBaseLight.svg";
import DataBaseDark from "@public/icons/database/DataBaseDark.svg";
import ObjectGroupLight from "@public/icons/database/ObjectGroupLight.svg";
import ObjectGroupDark from "@public/icons/database/ObjectGroupDark.svg";
import SchemaLight from "@public/icons/database/SchemaLight.svg";
import SchemaDark from "@public/icons/database/SchemaDark.svg";
import TableLight from "@public/icons/database/TableLight.svg";
import TableDark from "@public/icons/database/TableDark.svg";
import ColumnLight from "@public/icons/database/ColumnLight.svg";
import ColumnDark from "@public/icons/database/ColumnDark.svg";
import TreeClosed from "@public/icons/TreeClosed.svg";
import TreeExpended from "@public/icons/TreeExpended.svg";
import ConsoleRunDark from "@public/icons/database/ConsoleRunDark.svg";
import ConsoleRunLight from "@public/icons/database/ConsoleRunLight.svg";
import ManageDataSourcesDark from "@public/icons/database/ManageDataSourcesDark.svg";
import ManageDataSourcesLight from "@public/icons/database/ManageDataSourcesLight.svg";
import DBMSLight from "@public/icons/database/DBMSLight.svg";
import DBMSDark from "@public/icons/database/DBMSDark.svg";
import DDLDBMSLight from "@public/icons/database/DDLDBMSLight.svg";
import DDLDBMSDark from "@public/icons/database/DDLDBMSDark.svg";
import VirtualViewLight from "@public/icons/database/VirtualViewLight.svg";
import VirtualViewDark from "@public/icons/database/VirtualViewDark.svg";
import CopyDark from "@public/icons/inline/CopyDark.svg";
import CopyLight from "@public/icons/inline/CopyLight.svg";
import RefreshDark from "@public/icons/inline/RefreshDark.svg";
import RefreshLight from "@public/icons/inline/RefreshLight.svg";
import KillDataSourceProcessDark from "@public/icons/database/KillDataSourceProcessDark.svg";
import KillDataSourceProcessLight from "@public/icons/database/KillDataSourceProcessLight.svg";
import KillDataSourceProcessDisableDark from "@public/icons/database/KillDataSourceProcessDisableDark.svg";
import KillDataSourceProcessDisableLight from "@public/icons/database/KillDataSourceProcessDisableLight.svg";
import BackSpaceLight from "@public/icons/BackspaceLight.svg";
import BackSpaceDark from "@public/icons/BackspaceDark.svg";
import CloseSmallDark from "@public/icons/general/CloseSmallDark.svg";
import CloseSmallLight from "@public/icons/general/CloseSmallLight.svg";
import CloseSmallHoveredDark from "@public/icons/general/CloseSmallHoveredDark.svg";
import CloseSmallHoveredLight from "@public/icons/general/CloseSmallHoveredLight.svg";
import CloseMiniDark from "@public/icons/general/CloseMiniDark.svg";
import CloseMiniLight from "@public/icons/general/CloseMiniDark.svg";
import AddMiniDark from "@public/icons/general/AddMiniDark.svg";
import AddMiniLight from "@public/icons/general/AddMiniLight.svg";
import { useTheme } from "next-themes";
export const IconsObject = {
  SQLite: (light?: boolean, className?: string) =>
    light ? (
      <SQLiteLight className={className} />
    ) : (
      <SQLiteDark className={className} />
    ),
  ObjectGroup: (light?: boolean, className?: string) =>
    light ? (
      <ObjectGroupLight className={className} />
    ) : (
      <ObjectGroupDark className={className} />
    ),
  DataBase: (light?: boolean, className?: string) =>
    light ? (
      <DataBaseLight className={className} />
    ) : (
      <DataBaseDark className={className} />
    ),
  Schema: (light?: boolean, className?: string) =>
    light ? (
      <SchemaLight className={className} />
    ) : (
      <SchemaDark className={className} />
    ),
  Table: (light?: boolean, className?: string) =>
    light ? (
      <TableLight className={className} />
    ) : (
      <TableDark className={className} />
    ),
  Column: (light?: boolean, className?: string) =>
    light ? (
      <ColumnLight className={className} />
    ) : (
      <ColumnDark className={className} />
    ),
  TreeClosed: (light?: boolean, className?: string) => (
    <TreeClosed className={className} />
  ),
  TreeExpended: (light?: boolean, className?: string) => (
    <TreeExpended className={className} />
  ),
  ConsoleRun: (light?: boolean, className?: string) =>
    light ? (
      <ConsoleRunLight className={className} />
    ) : (
      <ConsoleRunDark className={className} />
    ),
  ManageDataSources: (light?: boolean, className?: string) =>
    light ? (
      <ManageDataSourcesLight className={className} />
    ) : (
      <ManageDataSourcesDark className={className} />
    ),
  DBMS: (light?: boolean, className?: string) =>
    light ? (
      <DBMSLight className={className} />
    ) : (
      <DBMSDark className={className} />
    ),
  DDLDBMS: (light?: boolean, className?: string) =>
    light ? (
      <DDLDBMSLight className={className} />
    ) : (
      <DDLDBMSDark className={className} />
    ),
  VirtualView: (light?: boolean, className?: string) =>
    light ? (
      <VirtualViewLight className={className} />
    ) : (
      <VirtualViewDark className={className} />
    ),
  Copy: (light?: boolean, className?: string) =>
    light ? (
      <CopyLight className={className} />
    ) : (
      <CopyDark className={className} />
    ),
  Refresh: (light?: boolean, className?: string) =>
    light ? (
      <RefreshLight className={className} />
    ) : (
      <RefreshDark className={className} />
    ),
  KillDataSourceProcess: (light?: boolean, className?: string) =>
    light ? (
      <KillDataSourceProcessLight className={className} />
    ) : (
      <KillDataSourceProcessDark className={className} />
    ),
  KillDataSourceProcessDisable: (light?: boolean, className?: string) =>
    light ? (
      <KillDataSourceProcessDisableLight className={className} />
    ) : (
      <KillDataSourceProcessDisableDark className={className} />
    ),
  BackSpace: (light?: boolean, className?: string) =>
    light ? (
      <BackSpaceLight className={className} />
    ) : (
      <BackSpaceDark className={className} />
    ),
  CloseSmall: (light?: boolean, className?: string) =>
    light ? (
      <CloseSmallLight className={className} />
    ) : (
      <CloseSmallDark className={className} />
    ),
  CloseSmallHovered: (light?: boolean, className?: string) =>
    light ? (
      <CloseSmallHoveredLight className={className} />
    ) : (
      <CloseSmallHoveredDark className={className} />
    ),
  CloseMini: (light?: boolean, className?: string) =>
    light ? (
      <CloseMiniLight className={className} />
    ) : (
      <CloseMiniDark className={className} />
    ),
  AddMini: (light?: boolean, className?: string) =>
    light ? (
      <AddMiniLight className={className} />
    ) : (
      <AddMiniDark className={className} />
    ),
};
type IconName = keyof typeof IconsObject;

export const Icons: React.FC<{
  name: IconName | string;
  className?: string;
}> = ({ name, className }) => {
  const { theme } = useTheme();
  return IconsObject[name as IconName](
    theme === "light",
    className ? className : "",
  );
};
