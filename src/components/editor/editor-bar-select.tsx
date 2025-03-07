import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "./theme.css";
import { useEffect, useState } from "react";
import { useSQLEditorEnvStore } from "@/store/SQLEditorEnvStore";
const SQLEditorBarTransactionSelect: React.FC<{
  editorId: string;
}> = ({ editorId }) => {
  return (
    <Select
      onOpenChange={(open) => {
        console.log(open);
      }}
    >
      <SelectTrigger className="w-16 h-6 editor-bar-select-trigger text-xs">
        <SelectValue placeholder="模式" />
      </SelectTrigger>
      <SelectContent className="editor-bar-select-content">
        <SelectGroup className="mx-2">
          <SelectLabel className="text-xs py-1 editor-bar-select-item -indent-6 rounded-md">
            事务模式
          </SelectLabel>
          <SelectItem
            value={"自动"}
            className="text-xs focus:outline-none py-1 editor-bar-select-item rounded-md"
          >
            自动
          </SelectItem>
          <SelectItem
            value={"手动"}
            className="text-xs focus:outline-none py-1 editor-bar-select-item rounded-md"
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
    <div className="h-[26px] w-full flex py-[1px] border-0">
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
        <SelectTrigger className="w-32 h-6 editor-bar-select-trigger text-xs">
          <SelectValue placeholder="数据库" className="truncate" />
        </SelectTrigger>
        <SelectContent className="editor-bar-select-content">
          {dataBaseList.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item}
                className="text-xs focus:outline-none py-1 editor-bar-select-item rounded-md"
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

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
        <SelectTrigger className="w-32 h-6 editor-bar-select-trigger text-xs">
          <SelectValue placeholder="模式" className="truncate" />
        </SelectTrigger>
        <SelectContent>
          {schemaList.map((item, index) => {
            return (
              <SelectItem
                key={index}
                value={item}
                className="text-xs focus:outline-none py-1 editor-bar-select-item rounded-md"
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
