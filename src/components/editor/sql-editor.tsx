import React, { useEffect, useState, useRef } from "react";
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
import {
  DynamicTabItems,
  DynamicTabsItem,
} from "@/components/ui/dynamic-tabs/dynamic-tabs";

export function SQLEditor() {
  const useSQLEditorState = useSQLEditorEnvStore((state) => state.editors);
  const addSQLEditor = useSQLEditorEnvStore((state) => state.addEditor);
  const removeSQLEditor = useSQLEditorEnvStore((state) => state.removeEditor);
  const updateSQLEditor = useSQLEditorEnvStore((state) => state.updateEditor);
  const [newItem, setNewItem] = useState<DynamicTabsItem>();
  const [activeEditor, setActiveEditor] = useState<SQLEditorEnv | undefined>();
  const [defaultTabItems, setDefaultTabItems] = useState<DynamicTabsItem[]>([]);
  const monacoRef = useRef(null);
  useEffect(() => {
    if (useSQLEditorState.length == 0) {
      addSQLEditor(defaultSQLEditEnv);
      setDefaultTabItems([
        {
          id: defaultSQLEditEnv.editorId,
          label: defaultSQLEditEnv.name,
        },
      ]);
    } else {
      setDefaultTabItems(
        useSQLEditorState.map((value, index) => ({
          id: value.editorId,
          label: value.name,
        })),
      );
    }
    setActiveEditor(defaultSQLEditEnv);
  }, []);

  const onAddTab = () => {
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
    setNewItem({
      id: editorId,
      label: editorId,
    });
  };

  const onRemoveTab = (tabItem: DynamicTabsItem) => {
    removeSQLEditor(tabItem.id);
  };
  const onActiveTab = (tabItem: DynamicTabsItem) => {
    console.log(tabItem);
    const editor = useSQLEditorState.filter(
      (item) => item.editorId === tabItem.id,
    );
    setActiveEditor(editor[0]);
  };
  const options = {
    selectOnLineNumbers: true,
  };
  return (
    <div className={"h-full w-full"}>
      <Button
        onClick={() => {
          onAddTab();
        }}
      >
        add Editor
      </Button>
      <DynamicTabItems
        tabItems={defaultTabItems}
        activeTabItem={defaultTabItems[0]}
        newTabItem={newItem}
        // onCloseAllTabItems={onRemoveTab}
        onActiveTabItem={onActiveTab}
        onDisActiveTabItem={(tabItem) => {
          const editor = useSQLEditorState.filter(
            (item) => item.editorId === tabItem.id,
          );
          if (editor.length > 0) {
            const value = monacoRef.current.editor
              .getModel(
                "http://myserver/foo-schema.json/" + editor[0].editorId,
              )
              .getValue();
            updateSQLEditor(editor[0].editorId, {
              code: value,
            });
          }
        }}
      />
      {activeEditor && (
        <>
          <SQLEditorBar editorId={activeEditor.editorId} />
          <Editor
            options={options}
            value={activeEditor.code}
            path={"http://myserver/foo-schema.json/" + activeEditor.editorId}
            onMount={(editor, monaco) => {
              monacoRef.current = monaco;
            }}
          />
        </>
      )}
    </div>
  );
}

const SQLEditorBar: React.FC<{
  editorId: string;
}> = ({ editorId }) => {
  const addSQLEditor = useSQLEditorEnvStore((state) => state.addEditor);
  const removeSQLEditor = useSQLEditorEnvStore((state) => state.removeEditor);
  const updateSQLEditor = useSQLEditorEnvStore((state) => state.updateEditor);
  const [databaseList, setDatabaseList] = useState(["a", "b", "c", "d"]);
  const [schemaList, setSchemaList] = useState(["a", "b", "c", "d"]);
  return (
    <div className="h-[26px] w-full flex py-[1px] border-0">
      <Select
        onValueChange={(value) => {
          updateSQLEditor(editorId, {
            dataBaseName: value,
            schemaName: "",
          });
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
          updateSQLEditor(editorId, {
            schemaName: value,
          });
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

      <Button className={"h-5 w-5 p-0 my-auto mx-4"}>
        <Pause className={"hidden"} />
        <Play className={"block"} />
      </Button>
    </div>
  );
};
