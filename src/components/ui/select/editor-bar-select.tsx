import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select/select";

import "./theme.css";
import React, { useEffect, useState } from "react";
import { useSQLEditorEnvStore } from "@/store/SQLEditorEnvStore";
import { Separator } from "@/components/ui/separator";
const SQLEditorBarTransactionSelect: React.FC<{
  editorId: string;
}> = ({ editorId }) => {
  return (
    <Select onOpenChange={(open) => {}}>
      <SelectTrigger className="editor-bar-select-trigger h-6 w-24 font-inter text-default">
        <SelectValue placeholder="模式" />
      </SelectTrigger>
      <SelectContent className="editor-bar-select-content">
        <SelectGroup className="mx-2">
          <SelectLabel className="editor-bar-select-item rounded-md py-1 -indent-6 font-inter text-default">
            事务模式
          </SelectLabel>
          <SelectItem
            value={"自动"}
            className="editor-bar-select-item rounded-md py-1 font-inter text-default focus:outline-none"
          >
            自动
          </SelectItem>
          <SelectItem
            value={"手动"}
            className="editor-bar-select-item rounded-md py-1 font-inter text-default focus:outline-none"
          >
            手动
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
const SQLEditorBarSourceSelect: React.FC<{
  editorId: string;
}> = ({ editorId }) => {
  const [dataBaseList, setDataBaseList] = useState<string[]>([]);
  const [schemaList, setSchemaList] = useState<string[]>([]);
  const getSQLEditor = useSQLEditorEnvStore((state) => state.getEditor);
  const updateSQLEditor = useSQLEditorEnvStore((state) => state.updateEditor);
  const [dataBase, setDatabase] = useState<string>();
  const [schema, setSchema] = useState<string>();
  useEffect(() => {
    const editor = getSQLEditor(editorId);
    setDatabase(editor?.dataBaseName);
    setSchema(editor?.schemaName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorId]);

  return (
    <div className="flex h-6 w-auto border-0 py-[1px]">
      <Select
        onValueChange={(value) => {
          updateSQLEditor(editorId, {
            dataBaseName: value,
          });
          setSchema("");
        }}
        defaultValue={dataBase}
        onOpenChange={(open) => {
          if (open) {
            setDataBaseList(["mysql", "postgresql", "sqlite"]);
          }
        }}
      >
        <SelectTrigger className="editor-bar-select-trigger h-6 w-32 font-inter text-default">
          <SelectValue placeholder="数据库" className="truncate" />
        </SelectTrigger>
        <SelectContent className="editor-bar-select-content">
          {dataBaseList.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item}
                className="editor-bar-select-item rounded-md py-1 font-inter text-default focus:outline-none"
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Separator
        orientation="vertical"
        className={"editor-bar-button-split mx-2 h-5"}
      />
      <Select
        defaultValue={schema}
        value={schema}
        onValueChange={(value) => {
          updateSQLEditor(editorId, {
            schemaName: value,
          });
          setSchema(value);
        }}
        onOpenChange={(open) => {
          if (open) {
            setSchemaList([
              "schema_mysql",
              "schema_postgresql",
              "schema_sqlite",
            ]);
          }
        }}
      >
        <SelectTrigger className="editor-bar-select-trigger h-6 w-32 font-inter text-default">
          <SelectValue placeholder="模式" className="truncate" />
        </SelectTrigger>
        <SelectContent className="editor-bar-select-content">
          {schemaList.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item}
                className="editor-bar-select-item rounded-md py-1 font-inter text-default focus:outline-none"
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
export { SQLEditorBarTransactionSelect, SQLEditorBarSourceSelect };
