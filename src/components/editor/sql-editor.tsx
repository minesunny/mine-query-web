/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
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
  defaultSQLEditEnv,
  SQLEditorEnv,
  useSQLEditorEnvStore,
} from "@/store/SQLEditorEnvStore";
import { DataSourceSchema, DataSourceType } from "@/models";
import {
  DynamicTabItems,
  DynamicTabsItem,
} from "@/components/ui/dynamic-tabs/dynamic-tabs";
import AceEditor from "react-ace";
import * as ace from "ace-builds";
export function SQLEditor() {
  const useSQLEditorState = useSQLEditorEnvStore((state) => state.editors);
  const addSQLEditor = useSQLEditorEnvStore((state) => state.addEditor);
  const removeSQLEditor = useSQLEditorEnvStore((state) => state.removeEditor);
  const updateSQLEditor = useSQLEditorEnvStore((state) => state.updateEditor);
  const [newItem, setNewItem] = useState<DynamicTabsItem>();
  const [activeEditor, setActiveEditor] = useState<SQLEditorEnv | undefined>();
  const [changeEditor, setChangeEditor] = useState<bool>(false);
  const [defaultTabItems, setDefaultTabItems] = useState<DynamicTabsItem[]>([]);
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

  const onRemoveTab = (tabItems: DynamicTabsItem[]) => {
    removeSQLEditor(tabItems.map((item) => item.id));
  };
  const onActiveTab = (tabItem: DynamicTabsItem) => {
    const editor = useSQLEditorState.filter(
      (item) => item.editorId === tabItem.id,
    );
    setActiveEditor(editor[0]);
    const cursor = editor[0].cursor;
    ace.edit("UNIQUE_ID_OF_DIV").setValue(editor[0].code);
    if (cursor) {
      ace.edit("UNIQUE_ID_OF_DIV").gotoLine(cursor.row + 1, cursor.column);
    } else {
      ace.edit("UNIQUE_ID_OF_DIV").gotoLine(1, 0);
    }
  };

  return (
    <div className={"h-full w-full flex flex-col"}>
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
        onActiveTabItem={onActiveTab}
        onDisActiveTabItem={(tabItem) => {
          const editor = useSQLEditorState.filter(
            (item) => item.editorId === tabItem.id,
          );
          if (editor.length > 0) {
            var value = ace.edit("UNIQUE_ID_OF_DIV").getValue();
            var position = ace.edit("UNIQUE_ID_OF_DIV").getCursorPosition();
            updateSQLEditor(editor[0].editorId, {
              code: value,
              cursor: {
                column: position.column,
                row: position.row,
              },
            });
          }
        }}
        onCloseTabItem={(tabItem) => {
          onRemoveTab([tabItem]);
        }}
        onCloseOtherTabItems={(tabItems) => {
          onRemoveTab(tabItems);
        }}
        onCloseLeftTabItems={(tabItems) => {
          onRemoveTab(tabItems);
        }}
        onCloseRightTabItems={(tabItems) => {
          onRemoveTab(tabItems);
        }}
        onRenameTabItem={(item: DynamicTabsItem) => {}}
      />
      {activeEditor && (
        <>
          <SQLEditorBar editorId={activeEditor.editorId} />
          <AceEditor
            style={{
              flex: "1",
              width: "100%",
            }}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            defaultValue={activeEditor.code}
          />
        </>
      )}
    </div>
  );
}

const SQLEditorBar: React.FC<{
  editorId: string;
}> = ({ editorId }) => {
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
