/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button/button";
import "./theme.css";
import {
  defaultSQLEditEnv,
  SQLEditorEnv,
  useSQLEditorEnvStore,
} from "@/store/SQLEditorEnvStore";
import { DataSourceSchema, DataSourceType } from "@/models";
import AceEditor from "react-ace";
import * as ace from "ace-builds";

import { useSQLEditorOptionStore } from "@/store/SQLEditorOption";
const SQLEditor: React.FC = () => {
  // const useSQLEditorState = useSQLEditorEnvStore((state) => state.editors);
  // const useSQLOptionState = useSQLEditorOptionStore((state) => state.option);
  // const addSQLEditor = useSQLEditorEnvStore((state) => state.addEditor);
  // const removeSQLEditor = useSQLEditorEnvStore((state) => state.removeEditor);
  // const updateSQLEditor = useSQLEditorEnvStore((state) => state.updateEditor);
  // const [newItem, setNewItem] = useState<DynamicTabsItem>();
  // const [activeEditor, setActiveEditor] = useState<SQLEditorEnv | undefined>();
  // const [defaultTabItems, setDefaultTabItems] = useState<DynamicTabsItem[]>([]);
  // useEffect(() => {
  //   if (useSQLEditorState.length == 0) {
  //     addSQLEditor(defaultSQLEditEnv);
  //     setDefaultTabItems([
  //       {
  //         id: defaultSQLEditEnv.editorId,
  //         label: defaultSQLEditEnv.name,
  //       },
  //     ]);
  //   } else {
  //     setDefaultTabItems(
  //       useSQLEditorState.map((value) => ({
  //         id: value.editorId,
  //         label: value.name,
  //       })),
  //     );
  //   }
  //   setActiveEditor(defaultSQLEditEnv);
  // }, []);
  //
  // const onAddTab = () => {
  //   const editorId = new Date().getTime().toString();
  //   const editor: SQLEditorEnv = {
  //     dataSourceId: "",
  //     dataBaseName: "",
  //     schemaName: "",
  //     running: false,
  //     editorId: editorId,
  //     code: editorId,
  //     dataSourceType: DataSourceType.SQLite,
  //     name: editorId,
  //   };
  //   addSQLEditor(editor);
  //   setActiveEditor(editor);
  //   setNewItem({
  //     id: editorId,
  //     label: editorId,
  //   });
  // };
  //
  // const onRemoveTab = (tabItems: DynamicTabsItem[]) => {
  //   removeSQLEditor(tabItems.map((item) => item.id));
  // };
  // const onActiveTab = (tabItem: DynamicTabsItem) => {
  //   const editor = useSQLEditorState.filter(
  //     (item) => item.editorId === tabItem.id,
  //   );
  //   setActiveEditor(editor[0]);
  //   const cursor = editor[0].cursor;
  //   const aceEditor = ace.edit(useSQLOptionState.name);
  //   aceEditor.setValue(editor[0].code);
  //   if (cursor) {
  //     aceEditor.gotoLine(cursor.row + 1, cursor.column);
  //   } else {
  //     aceEditor.gotoLine(1, 0);
  //   }
  //   aceEditor.focus();
  // };
  //
  // return (
  //   <div className={"flex h-full w-full flex-col"}>
  //     <Button
  //       onClick={() => {
  //         onAddTab();
  //       }}
  //     >
  //       add Editor
  //     </Button>
  //     {/*<DynamicTabItems*/}
  //     {/*  tabItems={defaultTabItems}*/}
  //     {/*  activeTabItem={defaultTabItems[0]}*/}
  //     {/*  newTabItem={newItem}*/}
  //     {/*  onActiveTabItem={onActiveTab}*/}
  //     {/*  onDisActiveTabItem={(tabItem) => {*/}
  //     {/*    const editor = useSQLEditorState.filter(*/}
  //     {/*      (item) => item.editorId === tabItem.id,*/}
  //     {/*    );*/}
  //     {/*    if (editor.length > 0) {*/}
  //     {/*      const value = ace.edit(useSQLOptionState.name).getValue();*/}
  //     {/*      const position = ace*/}
  //     {/*        .edit(useSQLOptionState.name)*/}
  //     {/*        .getCursorPosition();*/}
  //     {/*      updateSQLEditor(editor[0].editorId, {*/}
  //     {/*        code: value,*/}
  //     {/*        cursor: {*/}
  //     {/*          column: position.column,*/}
  //     {/*          row: position.row,*/}
  //     {/*        },*/}
  //     {/*      });*/}
  //     {/*    }*/}
  //     {/*  }}*/}
  //     {/*  onCloseTabItem={(tabItem) => {*/}
  //     {/*    onRemoveTab([tabItem]);*/}
  //     {/*  }}*/}
  //     {/*  onCloseOtherTabItems={(tabItems) => {*/}
  //     {/*    onRemoveTab(tabItems);*/}
  //     {/*  }}*/}
  //     {/*  onCloseLeftTabItems={(tabItems) => {*/}
  //     {/*    onRemoveTab(tabItems);*/}
  //     {/*  }}*/}
  //     {/*  onCloseRightTabItems={(tabItems) => {*/}
  //     {/*    onRemoveTab(tabItems);*/}
  //     {/*  }}*/}
  //     {/*  onRenameTabItem={(item: DynamicTabsItem) => {*/}
  //     {/*    updateSQLEditor(item.id, {*/}
  //     {/*      name: item.label,*/}
  //     {/*    });*/}
  //     {/*  }}*/}
  //     {/*/>*/}
  //   </div>
  // );
  return <></>;
};
export { SQLEditor };
