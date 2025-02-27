"use client";

import * as React from "react";

import { ContextMenuDialog } from "@/components/dialog-content/context-menu-dialog";
import { NewDialog } from "@/components/dialog-content/input-dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
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
    tab: "bg-tabs-bg-selected",
    closeIcon: "visible",
    separator: "bg-tabs-bg-selected",
  },
  Selected: {
    tab: "bg-tabs-bg-selected",
    closeIcon: "visible",
    separator: "bg-tabs-selection",
  },
  "Selected Inactive": {
    tab: "bg-tabs-selection-disabled",
    closeIcon: "group-hover:!visible",
    separator: "bg-tabs-selection-disabled",
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
  const tabClass = TabClass[type];
  return (
    <ContextMenuDialog
      menu={[
        {
          label: "Close",
          onClick: () => close(item),
        },
        {
          label: "Close Other Tabs",
          onClick: () => closeOther && closeOther(item),
        },
        {
          label: "Close Tabs To Left",
          onClick: () => closeLeft && closeLeft(item),
        },
        {
          label: "Close Tabs To Right",
          onClick: () => closeRight && closeRight(item),
          // eslint-disable-next-line react/display-name
          dialog: React.forwardRef<
            React.ElementRef<typeof DialogPrimitive.Trigger>,
            React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
          >(({ children, ...props }, ref) => (
            <NewDialog
              name={"Rename Tab"}
              title={"Rename Tab"}
              value={item.label}
              ref={ref}
              confirm={(value) => {
                item.label = value;
                rename && rename(item);
              }}
            />
          )),
        },
        {
          label: "Rename Tab",
        },
      ]}
    >
      <button> {item.id}</button>
    </ContextMenuDialog>
  );
  // return (
  //   <>
  //     <ContextMenu>
  //       <ContextMenuTrigger
  //         className={`h-[38px] max-w-[240px] px-[10px] flex items-center ${tabClass.tab} group-hover:bg-tabs-hover `}
  //       >
  //         <button
  //           id="content"
  //           className={`h-[16px] flex flex-1 mr-[16px]`}
  //           onClick={() => active(item)}
  //         >
  //           <div className={"h-[16px] w-[24px] pr-[8px]"}>
  //             {item.icon && item.icon}
  //           </div>
  //           <span className={"text-default text-text"}>{item.label}</span>
  //         </button>
  //         <div
  //           id="closeIcon"
  //           className={`group-hover:bg-panel-bg-content h-[16px] w-[16px] rounded-full`}
  //           onClick={() => close(item)}
  //         >
  //           <Icons
  //             name={"CloseSmall"}
  //             className={`${type == "Selected" ? "visible" : "invisible group-hover:visible"}`}
  //           />
  //         </div>
  //       </ContextMenuTrigger>
  //       <ContextMenuContent
  //         onCloseAutoFocus={(e) => e.preventDefault()}
  //         hidden={hasOpenDialog}
  //       >
  //         <ContextMenuItem inset onClick={() => close(item)}>
  //           Close
  //         </ContextMenuItem>
  //         <ContextMenuDialog
  //           name={"Rename Tab"}
  //           title={"Rename Tab"}
  //           value={item.label}
  //           trigger={
  //             <ContextMenuItem
  //               onSelect={(event) => {
  //                 setHasOpenDialog(true);
  //               }}
  //             >
  //               Rename Tab
  //             </ContextMenuItem>
  //           }
  //           confirm={(value) => {
  //             if (rename) {
  //               rename({ ...item, label: value });
  //             }
  //           }}
  //         >
  //           <DialogHeader windowControl={false}>
  //             <DialogTitle>{"title"}</DialogTitle>
  //           </DialogHeader>
  //         </ContextMenuDialog>
  //
  //         {closeOther && (
  //           <ContextMenuItem inset onClick={() => closeOther(item)}>
  //             Close Other Tabs
  //           </ContextMenuItem>
  //         )}
  //         {closeLeft && (
  //           <ContextMenuItem inset onClick={() => closeLeft(item)}>
  //             Close Tabs To Left
  //           </ContextMenuItem>
  //         )}
  //         {closeRight && (
  //           <ContextMenuItem inset onClick={() => closeRight(item)}>
  //             Close Tabs To Right
  //           </ContextMenuItem>
  //         )}
  //       </ContextMenuContent>
  //     </ContextMenu>
  //     <Separator
  //       className={`${tabClass.separator}  w-full h-[3px] rounded-sm`}
  //       id="separator"
  //     />
  //   </>
  // );
};
export { DynamicTabs };
export type { DynamicTabsProps, DynamicTabsItem };
