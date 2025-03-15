"use client";

import * as React from "react";
import "./theme.css";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu/context-menu";
import { Input } from "../input/input";
import { SVG } from "../Icons";
import { Separator } from "../separator";
const tabsIndexOf = (items: DynamicTabsItem[], id: string) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return i;
    }
  }
  return -1;
};
type DynamicTabsItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
};
type DynamicTabsContent = {
  id: string;
  label: string;
  content: React.ReactNode;
};

// type DynamicTabsProps = {
//   items: DynamicTabsItem[];
//   contents: DynamicTabsContent[];
//   onActive?: (item: DynamicTabsItem, content?: DynamicTabsContent) => void;
//   onDisActive?: (item: DynamicTabsItem, content?: DynamicTabsContent) => void;
//   onClose?: (item: DynamicTabsItem, content?: DynamicTabsContent) => void;
//   onCloseAll?: (
//     items: DynamicTabsItem[],
//     contents: (DynamicTabsContent | undefined)[],
//   ) => void;
//   onCloseOther?: (
//     items: DynamicTabsItem[],
//     contents: (DynamicTabsContent | undefined)[],
//   ) => void;
//   onCloseLeft?: (
//     items: DynamicTabsItem[],
//     contents: (DynamicTabsContent | undefined)[],
//   ) => void;
//   onCloseRight?: (
//     items: DynamicTabsItem[],
//     contents: (DynamicTabsContent | undefined)[],
//   ) => void;
//   onRename?: (item: DynamicTabsItem, content?: DynamicTabsContent) => void;
// };

// const DynamicTabs: React.FC<DynamicTabsProps> = ({
//   items,
//   contents,
//   onActive,
//   onDisActive,
//   onClose,
//   onCloseAll,
//   onCloseOther,
//   onCloseRight,
//   onCloseLeft,
//   onRename,
// }) => {
//   const [contentsState, setContentsState] =
//     React.useState<DynamicTabsContent[]>(contents);
//   const [activeTab, setActiveTab] = React.useState<DynamicTabsItem>(items[0]);
//   const active = (item: DynamicTabsItem) => {
//     setActiveTab(item);
//     if (onActive) {
//       onActive(
//         item,
//         contentsState.find((ele) => ele.id == item.id),
//       );
//     }
//   };

//   const disActive = (item: DynamicTabsItem) => {
//     if (onDisActive) {
//       onDisActive(
//         item,
//         contentsState.find((ele) => ele.id == item.id),
//       );
//     }
//   };

//   const close = (item: DynamicTabsItem) => {
//     if (onClose) {
//       onClose(
//         item,
//         contentsState.find((ele) => ele.id == item.id),
//       );
//     }
//   };
//   const closeAllTabs = (items: DynamicTabsItem[]) => {
//     setContentsState([]);
//     const contents: (DynamicTabsContent | undefined)[] = [];
//     items.forEach((item, index) => {
//       contents.push(contentsState.find((ele) => ele.id == item.id));
//     });
//     if (onCloseAll) {
//       onCloseAll(items, contents);
//     }
//   };

//   const closeLeftTabs = (items: DynamicTabsItem[]) => {
//     const contents: (DynamicTabsContent | undefined)[] = [];
//     const remainContents: DynamicTabsContent[] = [];
//     items.forEach((item, index) => {
//       contents.push(contentsState.find((ele) => ele.id == item.id));
//     });

//     contentsState.forEach((item, index) => {
//       const con = contents.find((ele) => {
//         if (ele == undefined) {
//           return undefined;
//         }
//         return ele.id == item.id;
//       });
//       if (con == undefined) {
//         remainContents.push(item);
//       }
//     });
//     setContentsState([...remainContents]);
//     if (onCloseLeft) {
//       onCloseLeft(items, contents);
//     }
//   };

//   const closeRightTabs = (item: DynamicTabsItem) => {
//     const contents: (DynamicTabsContent | undefined)[] = [];
//     const remainContents: DynamicTabsContent[] = [];
//     items.forEach((item, index) => {
//       contents.push(contentsState.find((ele) => ele.id == item.id));
//     });
//     contentsState.forEach((item, index) => {
//       const con = contents.find((ele) => {
//         if (ele == undefined) {
//           return undefined;
//         }
//         return ele.id == item.id;
//       });
//       if (con == undefined) {
//         remainContents.push(item);
//       }
//     });
//     setContentsState([...remainContents]);
//     if (onCloseRight) {
//       onCloseRight(items, contents);
//     }
//   };

//   const closeOtherTabs = (items: DynamicTabsItem[]) => {
//     const contents: (DynamicTabsContent | undefined)[] = [];
//     const remainContents: DynamicTabsContent[] = [];
//     items.forEach((item, index) => {
//       contents.push(contentsState.find((ele) => ele.id == item.id));
//     });
//     contentsState.forEach((item, index) => {
//       const con = contents.find((ele) => {
//         if (ele == undefined) {
//           return undefined;
//         }
//         return ele.id == item.id;
//       });
//       if (con == undefined) {
//         remainContents.push(item);
//       }
//     });
//     setContentsState([...remainContents]);
//     if (onCloseOther) {
//       onCloseOther(items, contents);
//     }
//   };
//   const rename = (item: DynamicTabsItem) => {
//     const newContents = contentsState.map((tab) =>
//       tab.id === item.id ? { ...tab, label: item.label } : tab,
//     );
//     setContentsState(newContents);
//     if (onRename) {
//       onRename(
//         item,
//         contentsState.find((ele) => ele.id == item.id),
//       );
//     }
//   };

//   return (
//     <div className={"w-[500px] h-[500px] bg-editor-content "}>
//       <DynamicTabItems
//         tabItems={items}
//         activeTabItem={items[0]}
//         onActiveTabItem={active}
//         onCloseLeftTabItems={closeLeftTabs}
//         onCloseRightTabItems={closeAllTabs}
//         newTabItem={{
//           id: "",
//           label: "",
//         }}
//         onCloseAllTabItems={closeAllTabs}
//         onDisActiveTabItem={disActive}
//         onRenameTabItem={rename}
//         onCloseOtherTabItems={closeOtherTabs}
//       />
//       {contentsState &&
//         contentsState.map((content, index) => (
//           <TabContent
//             key={index}
//             content={content}
//             isActive={activeTab?.id == content.id}
//           />
//         ))}
//     </div>
//   );
// };

// const TabContent: React.FC<{ content: DynamicTabsContent; isActive: boolean }> =
//   React.memo(({ content, isActive }) => {
//     return (
//       <div className={`${isActive ? "visible" : "hidden"} w-full h-full`}>
//         {content.content};
//       </div>
//     );
//   });
// TabContent.displayName = "TabContent";
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
    tab: "bg-items-bg-selected",
    closeIcon: "visible",
    separator: "tab-item-separator",
  },
  "Selected Inactive": {
    tab: "",
    closeIcon: "group-hover:!visible",
    separator: "tab-item-separator-inactive",
  },
};

type DynamicTabItemProp = {
  onActiveTabItem?: (item: DynamicTabsItem) => void;
  onCloseTabItem?: (item: DynamicTabsItem) => void;
  onCloseAllTabItems?: (item: DynamicTabsItem[]) => void;
  onCloseOtherTabItems?: (item: DynamicTabsItem[]) => void;
  onCloseLeftTabItems?: (item: DynamicTabsItem[]) => void;
  onCloseRightTabItems?: (item: DynamicTabsItem[]) => void;
  onRenameTabItem?: (item: DynamicTabsItem) => void;
  onDisActiveTabItem?: (item: DynamicTabsItem) => void;
};

const DynamicTabItems: React.FC<
  DynamicTabItemProp & {
    closeLast?: boolean;
    tabItems: DynamicTabsItem[];
    activeTabItem: DynamicTabsItem;
    newTabItem?: DynamicTabsItem | undefined;
  }
> = ({
  closeLast,
  tabItems,
  onActiveTabItem,
  onCloseTabItem,
  onCloseOtherTabItems,
  onCloseLeftTabItems,
  onCloseRightTabItems,
  onRenameTabItem,
  activeTabItem,
  onDisActiveTabItem,
  onCloseAllTabItems,
  newTabItem,
}) => {
  const [items, setItems] = React.useState<DynamicTabsItem[]>(tabItems);
  const [activeItem, setActiveItem] =
    React.useState<DynamicTabsItem>(activeTabItem);
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState<string>("-");
  React.useEffect(() => {
    setItems([...tabItems]);
    setActiveItem(activeTabItem);
  }, [tabItems, activeTabItem]);
  React.useEffect(() => {
    if (newTabItem != undefined) {
      if (items.length == 0) {
        setActiveItem(newTabItem);
      }
      setItems([...items, newTabItem]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTabItem]);

  const active = (tabItem: DynamicTabsItem) => {
    if (tabItem.id !== activeItem.id) {
      disActive(activeItem);
      setActiveItem(tabItem);
      if (onActiveTabItem) {
        onActiveTabItem(tabItem);
      }
    }
  };

  const disActive = (tabItem: DynamicTabsItem) => {
    if (onDisActiveTabItem) {
      onDisActiveTabItem(tabItem);
    }
  };
  const close = (tabItem: DynamicTabsItem) => {
    if (!closeLast && items.length == 1) {
      return;
    }
    let index = tabsIndexOf(items, tabItem.id);
    const newTabs = items.filter((tab) => tab.id !== tabItem.id);
    index = index >= newTabs.length ? newTabs.length - 1 : index;
    setItems(newTabs);
    if (onCloseTabItem) {
      onCloseTabItem(tabItem);
    }
    if (activeItem.id === tabItem.id && index < newTabs.length && index >= 0) {
      setActiveItem(newTabs[index]);
      if (onActiveTabItem) {
        onActiveTabItem(newTabs[index]);
      }
    }
  };

  const closeAllTabs = (tabItems: DynamicTabsItem[]) => {
    if (!closeLast) {
      return;
    }
    setItems([]);
    if (onCloseAllTabItems) {
      onCloseAllTabItems(tabItems);
    }
  };

  const closeLeftTabs = (tabItem: DynamicTabsItem) => {
    const id = tabItem.id;
    let index = 0;
    if (items[index].id === tabItem.id) {
      return;
    }
    let item0;
    let leftActive = false;
    for (; index < items.length; index++) {
      if (items[index].id === activeItem.id) {
        leftActive = true;
      }
      if (items[index].id === id) {
        item0 = items[index];
        break;
      }
    }
    setItems(items.slice(index));
    if (onCloseLeftTabItems) {
      onCloseLeftTabItems(items.slice(0, index));
    }
    if (leftActive && item0) {
      setActiveItem(item0);
      if (onActiveTabItem) {
        onActiveTabItem(item0);
      }
    }
  };

  const closeRightTabs = (tabItem: DynamicTabsItem) => {
    const id = tabItem.id;
    let index = items.length - 1;
    if (items[index].id === tabItem.id) {
      return;
    }
    let item0;
    let rightActive = false;
    for (; index >= 0; index--) {
      if (items[index].id === activeItem.id) {
        rightActive = true;
      }
      if (items[index].id === id) {
        item0 = items[index];
        break;
      }
    }
    setItems(items.slice(0, index + 1));
    if (onCloseRightTabItems) {
      onCloseRightTabItems(items.slice(index + 1));
    }

    if (rightActive && item0) {
      setActiveItem(item0);
      if (onActiveTabItem) {
        onActiveTabItem(item0);
      }
    }
  };

  const closeOtherTabs = (tabItem: DynamicTabsItem) => {
    const id = tabItem.id;
    let closeItems = items.filter((tab) => tab.id != id);
    setItems([tabItem]);
    if (onCloseOtherTabItems) {
      onCloseOtherTabItems(closeItems);
    }
    if (activeItem.id !== id) {
      setActiveItem(tabItem);
      if (onActiveTabItem) {
        onActiveTabItem(tabItem);
      }
    }
  };
  const rename = (tabItem: DynamicTabsItem) => {
    const newTabs = items.map((tab) =>
      tab.id === tabItem.id ? { ...tab, label: tabItem.label } : tab,
    );
    setItems(newTabs);
    if (onRenameTabItem) {
      onRenameTabItem(tabItem);
    }
  };
  const closeClass = (id: string) => {
    if (!closeLast && items.length == 1) {
      return "invisible";
    }
    return activeItem.id == id
      ? TabClass["Selected"].closeIcon
      : "invisible group-hover:visible";
  };
  return (
    <div className={"h-[41px] w-full flex items-center justify-start"}>
      {items &&
        items.map((item, index) => (
          <div className={"flex-wrap flex-row group"} key={index} id="item">
            <Dialog
              open={open === item.id}
              onOpenChange={(open: boolean) => {
                open ? setOpen(item.id) : setOpen("");
              }}
            >
              <ContextMenu>
                <ContextMenuTrigger
                  className={`h-[38px] max-w-[240px] px-[10px] flex items-center ${activeItem.id == item.id ? TabClass["Selected"].tab : ""} opacity-80 group-hover:opacity-100`}
                >
                  <button
                    id="content"
                    className={"h-[16px] flex flex-1 mr-[16px]"}
                    onClick={() => active(item)}
                  >
                    <span className={"font-inter text-default"}>
                      {item.label}
                    </span>
                  </button>
                  <div
                    id="closeIcon"
                    className={`tab-item-icon h-[16px] w-[16px] rounded-full ${closeClass(item.id)}`}
                    onClick={() => close(item)}
                  >
                    <SVG name={"closeSmall"} />
                  </div>
                </ContextMenuTrigger>
                <Separator
                  className={`w-full h-[3px] rounded-sm ${activeItem.id == item.id ? TabClass["Selected"].separator : ""}`}
                  id="separator"
                />
                <ContextMenuContent>
                  {onCloseOtherTabItems && (
                    <ContextMenuItem inset onClick={() => closeOtherTabs(item)}>
                      Close Other Tabs
                    </ContextMenuItem>
                  )}
                  {onCloseLeftTabItems && index != 0 && (
                    <ContextMenuItem inset onClick={() => closeLeftTabs(item)}>
                      Close Tabs To Left
                    </ContextMenuItem>
                  )}
                  {onCloseRightTabItems && index != items.length - 1 && (
                    <ContextMenuItem inset onClick={() => closeRightTabs(item)}>
                      Close Tabs To Right
                    </ContextMenuItem>
                  )}
                  <DialogTrigger asChild>
                    {onRenameTabItem && (
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
                  height: 85,
                }}
              >
                <DialogHeader windowControl={false}>
                  <DialogTitle>Rename Tab</DialogTitle>
                </DialogHeader>
                <div className={"w-full px-4 py-1 rounded-b-lg"}>
                  <Input
                    type="Text"
                    value={inputValue}
                    placeholder="Name"
                    onMouseDown={(e) => e.stopPropagation()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        rename({ ...item, label: inputValue });
                        setOpen("");
                      }
                    }}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
    </div>
  );
};

export { DynamicTabItems };
export type { DynamicTabsItem, DynamicTabsContent };
