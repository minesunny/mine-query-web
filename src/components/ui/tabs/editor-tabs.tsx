import {
  DynamicTabsTrigger,
  TabItemProps,
  Tabs,
  TabsContent,
  TabsList,
} from "@/components/ui/tabs";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { EditorTabDropdownMenu } from "@/components/ui/dropdown-menu";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-ambiance";

import {
  SQLEditorBarTransactionSelect,
  SQLEditorBarSourceSelect,
} from "@/components/ui/select";
import { useSQLEditorEnvStore } from "@/store/SQLEditorEnvStore";
import { useSQLEditorOptionStore } from "@/store/SQLEditorOption";
import { contextMenu } from "@/lib/utils";
import { DataSourceType } from "@/models";
import ace from "ace-builds";
import { useEnvStoreStore } from "@/store/Env";

import "@/components/ui/dynamic-tabs/theme.css";
import ReactAce from "react-ace";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
const defaultTriggerItem: TabItemProps = {
  id: "",
  label: "",
  key: "",
  type: "Editor",
  closable: false,
};
const tabsIndexOf = (items: TabItemProps[], id: string) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return i;
    }
  }
  return -1;
};

const tabsHasEditor = (items: TabItemProps[]) => {
  return items.filter((tab) => tab.type === "Editor").length > 0;
};
export function EditorTabs() {
  const [tabs, setTabs] = useState<TabItemProps[]>([]);
  const dropMenuRef = useRef<HTMLButtonElement>(null);
  const useSQLOptionState = useSQLEditorOptionStore((state) => state.option);

  const { addEditor, removeEditor, updateEditor, getEditor } =
    useSQLEditorEnvStore((state) => state);
  const [triggerItem, setTriggerItem] =
    useState<TabItemProps>(defaultTriggerItem);
  const [activeTab, setActiveTab] = useState<TabItemProps>(defaultTriggerItem);
  const [hasEditor, setHasEditor] = useState<boolean>(false);
  const editorRef = useRef<ReactAce>(null);
  const updateActiveTab = (TabItemProps: TabItemProps) => {
    if (activeTab.type == "Editor" && editorRef?.current) {
      const value = ace.edit(useSQLOptionState.name).getValue();
      const position = ace.edit(useSQLOptionState.name).getCursorPosition();
      updateEditor(activeTab.id, {
        code: value,
        cursor: {
          column: position.column,
          row: position.row,
        },
      });
    }

    setActiveTab(TabItemProps);
  };
  const closeEditor = (tabs: TabItemProps[]) => {
    const editorIds = tabs
      .filter((tab) => tab.type === "Editor")
      .map((editor) => editor.id);
    removeEditor(editorIds);
  };
  const closeLeftTabs = (itemId: string): void => {
    let index = 0;
    if (tabs[index].id === itemId) {
      return;
    }
    let tab;
    let leftActive = false;
    for (; index < tabs.length; index++) {
      if (tabs[index].id === itemId) {
        leftActive = true;
      }
      if (tabs[index].id === itemId) {
        tab = tabs[index];
        break;
      }
    }
    const newTabs = tabs.slice(index);
    setHasEditor(tabsHasEditor(newTabs));
    setTabs(tabs.slice(index));
    if (leftActive && tab) {
      updateActiveTab(tab);
    }
    closeEditor(tabs.slice(0, index));
  };
  const closeRightTabs = (itemId: string): void => {
    let index = tabs.length - 1;
    if (tabs[index].id === itemId) {
      return;
    }
    let tab;
    let rightActive = false;
    for (; index >= 0; index--) {
      if (tabs[index].id === itemId) {
        rightActive = true;
      }
      if (tabs[index].id === itemId) {
        tab = tabs[index];
        break;
      }
    }
    const newTabs = tabs.slice(0, index + 1);
    setHasEditor(tabsHasEditor(newTabs));
    setTabs(newTabs);
    if (rightActive && tab) {
      updateActiveTab(tab);
    }
    closeEditor(tabs.slice(index + 1));
  };
  const closeOtherTabs = (itemId: string): void => {
    let closeTabs = tabs.filter((tab) => tab.id != itemId);
    let index = tabsIndexOf(tabs, itemId);
    if (index > 0) {
      setTabs([tabs[index]]);
    }
    if (activeTab.id !== itemId) {
      setHasEditor(tabs[index].type === "Editor");
      updateActiveTab(tabs[index]);
    }
    closeEditor(closeTabs);
  };
  const closeTab = (TabItemProps: TabItemProps): void => {
    const itemId = TabItemProps.id;
    if (tabs.length == 1) {
      return;
    }
    let index = tabsIndexOf(tabs, itemId);
    const newTabs = tabs.filter((tab) => tab.id !== itemId);
    index = index >= newTabs.length ? newTabs.length - 1 : index;
    setTabs(newTabs);
    if (activeTab.id === itemId && index < newTabs.length && index >= 0) {
      updateActiveTab(newTabs[index]);
    }
    setHasEditor(tabsHasEditor(newTabs));
    removeEditor(itemId);
  };

  const closeAllTabs = (itemId: string): void => {};
  const renameTab = (itemId: string, newName: string): void => {
    const index = tabsIndexOf(tabs, itemId);
    if (index >= 0) {
      const TabItemProps: TabItemProps = {
        key: itemId,
        id: itemId,
        label: newName,
        type: "Editor",
      };
      setTabs([
        ...tabs.slice(0, index),
        TabItemProps,
        ...tabs.slice(index + 1),
      ]);
      updateEditor(itemId, {
        name: newName,
      });
    }
  };
  const createTab = (): void => {
    const newTab: TabItemProps = {
      id: Math.random().toString(36).substr(2, 10),
      label: Math.random().toString(36).substr(2, 10),
      key: "editor-tab",
      type: "Editor",
      closable: true,
    };
    setTabs([...tabs, newTab]);
    addEditor({
      dataSourceId: "",
      dataBaseName: "",
      schemaName: "",
      running: false,
      editorId: newTab.id,
      code: "select * from b " + newTab.id,
      dataSourceType: DataSourceType.SQLite,
      name: "defaultName",
      executing: false,
    });
    updateActiveTab(newTab);
    setHasEditor(true);
  };
  return (
    <Tabs defaultValue="account" className="h-full w-full" value={activeTab.id}>
      <EditorTabDropdownMenu
        item={{
          id: triggerItem.id,
          label: triggerItem.label,
        }}
        closeLeftTabs={
          tabsIndexOf(tabs, triggerItem.id) != 0 ? closeLeftTabs : undefined
        }
        closeRightTabs={
          tabsIndexOf(tabs, triggerItem.id) != tabs.length - 1
            ? closeLeftTabs
            : undefined
        }
        // closeAllTabs={closeAllTabs}
        closeOtherTabs={tabs.length !== 1 ? closeOtherTabs : undefined}
        renameTab={renameTab}
        ref={dropMenuRef}
      />

      <TabsList className="w-full">
        {tabs.map((tab, index) => {
          return (
            <DynamicTabsTrigger
              value={tab.id}
              key={index}
              onClick={() => {
                updateActiveTab(tab);
              }}
              tabItem={tab}
              saved={!!getEditor(tab.id)?.saved}
              onContextMenu={(event: any) => {
                setTriggerItem(tab);
                contextMenu(event, dropMenuRef);
                event.preventDefault();
              }}
              saveAction={() => {
                editorRef?.current &&
                  updateEditor(tab.id, {
                    code: editorRef.current.editor.getValue(),
                    saved: true,
                  });
              }}
              close={tabs.length != 1 ? closeTab : undefined}
            />
          );
        })}
        <Toggle name={"add"} onClick={createTab} />
      </TabsList>
      {tabs
        .filter((tab) => {
          return tab.type != "Editor";
        })
        .map((tab, index) => (
          <TabsContent
            value={tab.id}
            key={index}
            className={"h-full w-full"}
          ></TabsContent>
        ))}
      {!hasEditor && <div className={"w-ful h-full"} />}
      <div className={"w-ful h-full"}>
        <SQLEditorTabContent editorId={activeTab.id} ref={editorRef} />
      </div>
    </Tabs>
  );
}

type SQLEditorTabContentProps = {
  editorId: string;
};
const SQLEditorTabContent = forwardRef<AceEditor, SQLEditorTabContentProps>(
  ({ editorId }, ref) => {
    const useSQLOptionState = useSQLEditorOptionStore((state) => state.option);
    const getEditor = useSQLEditorEnvStore((state) => state.getEditor);
    const updateEditor = useSQLEditorEnvStore((state) => state.updateEditor);
    const { editorHeight } = useEnvStoreStore((state) => state.env);

    useEffect(() => {
      const editor = getEditor(editorId);
      if (editor) {
        const cursor = editor.cursor;
        const aceEditor = ace.edit(useSQLOptionState.name);
        aceEditor.setValue(editor.code);
        if (cursor) {
          aceEditor.gotoLine(cursor.row + 1, cursor.column);
        } else {
          aceEditor.gotoLine(1, 0);
        }
        aceEditor.focus();
        // @ts-ignore
        aceEditor["editorId"] = editorId;
      } else {
      }
    }, [editorId]);
    return (
      <>
        <div className="flex h-9 items-center gap-1 border-0 bg-secondary">
          <Separator orientation="vertical" className={"mx-6 h-5"} />
          <Toggle name={"run"} />
          <Toggle name={"history"} />
          <Toggle name={"viewParameters"} />
          <Toggle name={"settings"} />
          <SQLEditorBarTransactionSelect editorId={editorId} />
          <Separator
            orientation="vertical"
            className={"editor-bar-button-split mx-2 h-5"}
          />
          <SQLEditorBarSourceSelect editorId={editorId} />
          <Separator
            orientation="vertical"
            className={"editor-bar-button-split mx-2 h-5"}
          />
          <Toggle name={"runStop"} />
        </div>
        <AceEditor
          ref={ref}
          style={{
            flex: "1",
            width: "100%",
            height: editorHeight - 72,
          }}
          commands={[
            {
              name: "save",
              bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
              exec: function (editor) {
                // because state not used in this callback, so bind a var;
                // @ts-ignore
                updateEditor(editor["editorId"], {
                  code: editor.getValue(),
                  saved: true,
                });
              },
            },
          ]}
          lineHeight={useSQLOptionState.lineHeight}
          showGutter={useSQLOptionState.showGutter}
          mode={useSQLOptionState.mode}
          name={useSQLOptionState.name}
          fontSize={useSQLOptionState.fontSize}
          setOptions={{
            showLineNumbers: useSQLOptionState.showLineNumbers,
            printMarginColumn: -1, // Set the print margin column to 80 characters
          }}
          theme={"ambiance"}
          editorProps={{ $blockScrolling: true }}
        />
      </>
    );
  },
);
