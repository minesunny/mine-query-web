import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pause, Play } from "lucide-react";
import {
  TabItem,
  TableListProps,
  TabList,
} from "@/components/tab-content/tab-list";
import {
  defaultSQLEditEnv,
  SQLEditorEnv,
  useSQLEditorEnvStore,
} from "@/store/SQLEditorEnvStore";
import { DataSourceType } from "@/models";

export function SQLEditorTabContent() {
  const useSQLEditorState = useSQLEditorEnvStore((state) => state.editors);
  const addSQLEditor = useSQLEditorEnvStore((state) => state.addEditor);
  const removeSQLEditor = useSQLEditorEnvStore((state) => state.removeEditor);
  const updateSQLEditor = useSQLEditorEnvStore((state) => state.updateEditor);

  const [activeEditor, setActiveEditor] = useState<SQLEditorEnv | undefined>();
  const [databaseList, setDatabaseList] = useState(["a", "b", "c", "d"]);
  const [schemaList, setSchemaList] = useState(["a", "b", "c", "d"]);
  let defaultTabItems: TabItem[];
  defaultTabItems = [];
  if (useSQLEditorState.length == 0) {
    addSQLEditor(defaultSQLEditEnv);
  }
  const tabItems = useSQLEditorState.map((item) => {
    return {
      id: item.editorId,
      label: item.editorId,
      content: <div>Content for {item.editorId}</div>,
    };
  });
  defaultTabItems.push(...tabItems);

  const tableListProps: TableListProps = {
    onClickTab: (tabItem) => {
      const editor = useSQLEditorState.filter(
        (item) => item.editorId === tabItem.id,
      );
      console.log(editor);
      setActiveEditor(editor[0]);
    },
    onAddTab: () => {
      const editorId = new Date().getTime().toString();
      const editor: SQLEditorEnv = {
        dataSourceId: "",
        dataBaseName: "",
        schemaName: "",
        running: false,
        editorId: editorId,
        code: editorId,
        dataSourceType: DataSourceType.SQLite,
        name: editorId,
      };
      addSQLEditor(editor);
      setActiveEditor(editor);
      return {
        id: editorId,
        label: editorId,
        content: <div>Content for Tab 7</div>,
      };
    },
    onRemoveTab: (removeItem, activeId) => {
      const editorId = removeItem.id;
      removeSQLEditor(editorId);
      const editor = useSQLEditorState.filter(
        (item) => item.editorId === activeId,
      );
      setActiveEditor(editor[0]);
    },
  };
  const options = {
    selectOnLineNumbers: true,
  };
  return (
    <div className={`h-full w-full`}>
      <TabList
        tabList={defaultTabItems}
        onAddTab={tableListProps.onAddTab}
        onRemoveTab={tableListProps.onRemoveTab}
        onClickTab={tableListProps.onClickTab}
      />
      <div className="h-[26px] w-full flex py-[1px] border-0">
        <Select
          onValueChange={(value) => {
            setSchemaList(["a" + value, "b" + value, "c" + value, "d" + value]);
            setActiveEditor((prevState) => {
              if (prevState) {
                return {
                  ...prevState,
                  dataBaseName: value,
                };
              }
            });
            if (activeEditor) {
              updateSQLEditor(activeEditor.editorId, {
                dataBaseName: value,
                schemaName: "",
              });
            }
          }}
        >
          <SelectTrigger className="w-[180px] h-[24px]">
            <SelectValue placeholder="数据库" />
          </SelectTrigger>
          <SelectContent>
            {databaseList.map((item, index) => {
              return (
                <SelectItem
                  key={index}
                  value={item}
                  className="h-[24px] focus:outline-none"
                >
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            setActiveEditor((prevState) => {
              if (prevState) {
                return {
                  ...prevState,
                  schemaName: value,
                };
              }
            });
            if (activeEditor) {
              updateSQLEditor(activeEditor.editorId, {
                schemaName: value,
              });
            }
          }}
        >
          <SelectTrigger className="w-[180px] h-[24px]">
            <SelectValue placeholder="模式" />
          </SelectTrigger>
          <SelectContent>
            {schemaList.map((item, index) => {
              return (
                <SelectItem
                  key={index}
                  value={item}
                  className="h-[24px] focus:outline-none"
                >
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Button className={`h-5 w-5 p-0 my-auto mx-4`}>
          <Pause className={`hidden`} />
          <Play className={`block`} />
        </Button>
      </div>
      <Editor options={options} value={activeEditor?.code} />
    </div>
  );
}
