import React, { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Plus, X } from "lucide-react";

export type TabItem = {
  id: string;
  content: React.ReactNode;
  label: string;
};

export type TableListProps = {
  tabList?: TabItem[];
  onClickTab?: (tabItem: TabItem) => void;
  onAddTab?: () => TabItem;
  onRemoveTab?: (removeItem: TabItem, activeId: string) => void;
};

export function TabList({
  tabList,
  onClickTab,
  onAddTab,
  onRemoveTab,
}: TableListProps = {}) {
  if (tabList === undefined) {
    tabList = [
      { id: "tab1", label: "Tab 1", content: <div>Content for Tab 1</div> },
    ];
  }
  const [tabs, setTabs] = useState<TabItem[]>(tabList);
  const [activeTab, setActiveTab] = useState(tabList[0]?.id);

  const handleClickTab = (tabItem: TabItem) => {
    if (onClickTab) {
      onClickTab(tabItem);
    }
    setActiveTab(tabItem.id);
  };

  const handleAddTab = () => {
    if (onAddTab) {
      const newTab = onAddTab();
      setTabs([...tabs, newTab]);
      setActiveTab(newTab.id);
      return;
    }
    const newTabId = `tab${tabs.length + 1}`;
    const newTab: TabItem = {
      id: newTabId,
      label: `Tab ${tabs.length + 1}`,
      content: <div>Content for {newTabId}</div>,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId);
  };

  const handleRemoveTab = (tabItem: TabItem) => {
    if (tabs.length === 1) {
      return;
    }
    const updatedTabs = tabs.filter((tab) => tab.id !== tabItem.id);
    setTabs(updatedTabs);
    let activeId = activeTab;
    if (activeTab === tabItem.id && updatedTabs.length > 0) {
      activeId = updatedTabs[0].id;
    }
    setActiveTab(activeId);
    if (onRemoveTab) {
      onRemoveTab(tabItem, activeId);
    }
  };
  return (
    <div className="flex w-full bg-slate-200">
      {tabs.map((tab, index) => (
        <TabItem
          index={index}
          active={tab.id === activeTab}
          key={tab.id}
          tabItem={tab}
          handleClickTab={handleClickTab}
          handleRemoveTab={handleRemoveTab}
        />
      ))}
      <Button
        onClick={handleAddTab}
        className={"rounded-full h-7 w-7 p-0 my-auto bg-slate-200"}
      >
        <Plus />
      </Button>
    </div>
  );
}

const TabItem = ({
  index,
  active,
  tabItem,
  handleClickTab,
  handleRemoveTab,
}: {
  index: number;
  active: boolean;
  tabItem: TabItem;
  handleClickTab: (tabItem: TabItem) => void;
  handleRemoveTab: (tabItem: TabItem) => void;
}) => {
  return (
    <div className={"h-[36px] max-w-[200px] flex-1 relative"}>
      <div
        className={`h-full max-w-[218px] ${active ? "block" : "hidden"} mx-[-9px]`}
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <symbol id="chrome-tab-geometry-left" viewBox="0 0 200 36">
              <path d="M20.9935 0H250V18V36H0C4.92611 35.5 11 31 11 26.5C11 22 11 20.5576 11 16.75C11 12.9424 11 11.5 11 7C11 2.5 15.7624 0 20.9935 0Z" />
            </symbol>
            <symbol id="chrome-tab-geometry-right" viewBox="0 0 200 36">
              <use xlinkHref="#chrome-tab-geometry-left" />
            </symbol>
            <clipPath id="crop">
              <rect className="mask" width="100%" height="100%" x="0" />
            </clipPath>
          </defs>
          <svg
            width="52%"
            height="100%"
            className={`${active ? "fill-white" : "fill-slate-200"}`}
          >
            <use
              xlinkHref="#chrome-tab-geometry-left"
              width="200"
              height="36"
            />
          </svg>
          <g transform="scale(-1, 1)">
            <svg
              width="52%"
              height="100%"
              x="-100%"
              y="0"
              className={`${active ? "fill-white" : "fill-slate-200"}`}
            >
              <use
                xlinkHref="#chrome-tab-geometry-right"
                width="200"
                height="36"
              />
            </svg>
          </g>
        </svg>
      </div>
      <div className="w-full h-full absolute top-0 py-1 px-[1px]">
        <button
          className={`h-full w-full rounded-lg ${active ? "" : "hover:bg-slate-100"} my-auto flex`}
          onClick={() => handleClickTab(tabItem)}
        >
          <div className={"h-full w-full flex justify-center"}>
            <div className={"flex-1 w-[20px] ml-1 py-[4px]"}>
              <X className={"h-[20px] w-[20px] rounded-full"} />
            </div>
            <div
              className={"h-full w-full truncate overflow-hidden whitespace-nowrap text-ellipsis text-sm py-[4px]"}
            >
              {tabItem.label}
            </div>
            <div className={"flex-1 w-[20px] mr-1 py-[4px]"}>
              <X
                className={"h-[20px] w-[20px] rounded-full hover:bg-slate-200"}
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemoveTab(tabItem);
                }}
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
