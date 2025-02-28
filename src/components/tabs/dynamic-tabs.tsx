"use client";

import * as React from "react";
import "./theme.css";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu/context-menu";
import { Button } from "@/components/ui/button/button";
import { Icons } from "@/components/ui/Icons";
import { Separator } from "@radix-ui/react-menu";
type DynamicTabsItem = {
  id: string;
  content: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
};

type DynamicTabsProps = {
  items: DynamicTabsItem[];
  onActive?: (item: DynamicTabsItem) => void;
  onDisActive?: (item: DynamicTabsItem) => void;
  onClose?: (item: DynamicTabsItem) => void;
  onCreate?: (item: DynamicTabsItem) => void;
  onCloseAll?: (items: DynamicTabsItem[]) => void;
  onCloseOther?: (items: DynamicTabsItem[]) => void;
  onCloseLeft?: (items: DynamicTabsItem[]) => void;
  onCloseRight?: (items: DynamicTabsItem[]) => void;
  onRename?: (item: DynamicTabsItem) => void;
};
const tabsIndexOf = (tabs: DynamicTabsItem[], id: string) => {
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].id === id) {
      return i;
    }
  }
  return -1;
};
const DynamicTabs: React.FC<DynamicTabsProps> = ({
  items,
  onActive,
  onDisActive,
  onClose,
  onCreate,
  onCloseAll,
  onCloseOther,
  onCloseRight,
  onCloseLeft,
  onRename,
}) => {
  const [tabs, setTabs] = React.useState<DynamicTabsItem[]>(items);
  const [activeTab, setActiveTab] = React.useState<DynamicTabsItem>(items[0]);
  const active = (item: DynamicTabsItem) => {
    if (item.id !== activeTab.id) {
      setActiveTab(item);
      if (onActive) {
        onActive(item);
      }
      disActive(activeTab);
    }
  };
  const disActive = (item: DynamicTabsItem) => {
    if (onDisActive) {
      onDisActive(item);
    }
  };

  const close = (item: DynamicTabsItem) => {
    let index = tabsIndexOf(tabs, item.id);
    const newTabs = tabs.filter((tab) => tab.id !== item.id);
    index = index >= newTabs.length ? newTabs.length - 1 : index;
    setTabs(newTabs);
    if (onClose) {
      onClose(item);
    }
    if (activeTab.id === item.id) {
      setActiveTab(newTabs[index]);
      if (onActive) {
        onActive(item);
      }
    }
  };
  const create = (item: DynamicTabsItem) => {
    const newTabs = [...tabs, item];
    setTabs(newTabs);
    if (onCreate) {
      onCreate(item);
    }
  };
  const closeAllTabs = (items: DynamicTabsItem[]) => {
    setTabs([]);
    if (onCloseAll) {
      onCloseAll(items);
    }
  };

  const closeLeftTabs = (item: DynamicTabsItem) => {
    const id = item.id;
    let index = 0;
    let item0;
    for (; index < tabs.length; index++) {
      if (tabs[index].id === id) {
        item0 = tabs[index];
        break;
      }
    }
    setTabs(tabs.slice(index));
    if (onCloseLeft) {
      onCloseLeft(tabs.slice(0, index));
    }
    if (activeTab.id === id && item0) {
      setActiveTab(item0);
      if (onActive) {
        onActive(item0);
      }
    }
  };

  const closeRightTabs = (item: DynamicTabsItem) => {
    const id = item.id;

    let index = 0;
    let item0;

    for (; index < tabs.length; index++) {
      if (tabs[index].id === id) {
        item0 = tabs[index];
        break;
      }
    }
    setTabs(tabs.slice(0, index));
    if (onCloseRight) {
      onCloseRight(tabs.slice(index));
    }

    if (activeTab.id === id && item0) {
      setActiveTab(item0);
      if (onActive) {
        onActive(item0);
      }
    }
  };

  const closeOtherTabs = (item: DynamicTabsItem) => {
    const id = item.id;
    let items = tabs.filter((tab) => tab.id == id);
    setTabs(tabs.filter((tab) => items));
    if (onCloseOther) {
      onCloseOther(tabs.filter((tab) => tab.id != id));
    }
    if (activeTab.id !== id && items.length > 0) {
      setActiveTab(items[0]);
      if (onActive) {
        onActive(items[0]);
      }
    }
  };
  const rename = (item: DynamicTabsItem) => {
    const newTabs = tabs.map((tab) =>
      tab.id === item.id ? { ...tab, label: item.label } : tab,
    );
    setTabs(newTabs);
    if (onRename) {
      onRename(item);
    }
  };
  return (
    <div className={"w-[500px] h-[500px] bg-editor-content "}>
      <div className={"h-[41px] w-full flex items-center justify-start"}>
        {tabs &&
          tabs.map((item) => (
            <div className={"flex-wrap flex-row group"} key={item.id}>
              <DynamicTabItem
                item={item}
                type={activeTab?.id == item.id ? "Selected" : "Default"}
                active={(item) => active(item)}
                close={(item) => close(item)}
                closeOther={(item) => closeOtherTabs(item)}
                closeLeft={(item) => closeLeftTabs(item)}
                closeRight={(item) => closeRightTabs(item)}
                rename={(item) => rename(item)}
              />
            </div>
          ))}
      </div>
      {items &&
        items.map((item) => (
          <TabContent
            key={item.id + "_content"}
            item={item}
            isActive={activeTab?.id == item.id}
          />
        ))}
    </div>
  );
};
const TabContent: React.FC<{ item: DynamicTabsItem; isActive: boolean }> =
  React.memo(({ item, isActive }) => {
    return (
      <div className={`${isActive ? "visible" : "hidden"} w-full h-full`}>
        {item.content};
      </div>
    );
  });
TabContent.displayName = "TabContent";
type TabType = "Default" | "Selected" | "Selected Inactive";
const TabClass: Record<
  TabType,
  {
    tab: string;
    closeIcon: string;
    separator: string;
  }
> = {
  Default: {
    tab: "tab-item",
    closeIcon: "invisible",
    separator: "",
  },
  Selected: {
    tab: "bg-tabs-bg-selected",
    closeIcon: "visible",
    separator: "tab-item-separator",
  },
  "Selected Inactive": {
    tab: "",
    closeIcon: "group-hover:!visible",
    separator: "tab-item-separator-inactive",
  },
};
const DynamicTabItem: React.FC<{
  item: DynamicTabsItem;
  type: TabType;
  active: (item: DynamicTabsItem) => void;
  close: (item: DynamicTabsItem) => void;
  closeOther?: (item: DynamicTabsItem) => void;
  closeLeft?: (item: DynamicTabsItem) => void;
  closeRight?: (item: DynamicTabsItem) => void;
  rename?: (item: DynamicTabsItem) => void;
}> = ({
  item,
  type,
  active,
  close,
  closeOther,
  closeRight,
  closeLeft,
  rename,
}) => {
  const [inputValue, setInputValue] = React.useState(item.label);
  const tabClass = TabClass[type];
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger
          className={`h-[38px] max-w-[240px] px-[10px] flex items-center ${tabClass.tab} opacity-80 group-hover:opacity-100`}
        >
          <button
            id="content"
            className={`h-[16px] flex flex-1 mr-[16px] `}
            onClick={() => active(item)}
          >
            <div className={"h-[16px] w-[24px] pr-[8px] "}>
              {item.icon && item.icon}
            </div>
            <span className={"text-default text-text"}>{item.label}</span>
          </button>
          <div
            id="closeIcon"
            className={`tab-item-icon-hover h-[16px] w-[16px] rounded-full`}
            onClick={() => close(item)}
          >
            <Icons name={"CloseSmall"} className={`${tabClass.closeIcon}`} />
          </div>
        </ContextMenuTrigger>
        <Separator
          className={`w-full h-[3px] rounded-sm ${tabClass.separator}`}
          id="separator"
        />
        <ContextMenuContent>
          {closeOther && (
            <ContextMenuItem inset onClick={() => closeOther(item)}>
              Close Other Tabs
            </ContextMenuItem>
          )}
          {closeLeft && (
            <ContextMenuItem inset onClick={() => closeLeft(item)}>
              Close Tabs To Left
            </ContextMenuItem>
          )}
          {closeRight && (
            <ContextMenuItem inset onClick={() => closeRight(item)}>
              Close Tabs To Right
            </ContextMenuItem>
          )}
          <DialogTrigger asChild>
            {rename && (
              <ContextMenuItem className={"indent-6"}>
                <span>Rename</span>
              </ContextMenuItem>
            )}
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>

      <DialogContent
        resizeable={false}
        size={{
          width: 345,
          height: 100,
        }}
      >
        <DialogHeader windowControl={false}>
          <DialogTitle>Rename Tab</DialogTitle>
        </DialogHeader>
        <div
          className={"bg-panel-bg-dialog-content w-full px-4 py-1 rounded-b-lg"}
        >
          <input
            type="Text"
            value={inputValue}
            placeholder="Name"
            onChange={(e) => setInputValue(e.target.value)}
            className={
              "w-full bg-panel-bg-dialog-content focus-visible:outline-none text-text text-sm"
            }
          />
        </div>
        <DialogFooter>
          {/*<DialogClose asChild>*/}
          {/*  <Button*/}
          {/*    onClick={() => {*/}
          {/*      rename && rename({ ...item, label: inputValue });*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    OK*/}
          {/*  </Button>*/}
          {/*</DialogClose>*/}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export { DynamicTabs };
export type { DynamicTabsProps, DynamicTabsItem };
