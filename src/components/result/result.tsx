import React from "react";
import {
  DynamicTabItems,
  DynamicTabsItem,
} from "@/components/ui/dynamic-tabs/dynamic-tabs";
import { SVGButton } from "@/components/ui/button/button";

const Result: React.FC = () => {
  return (
    <div className={"w-full h-full"}>
      <div className={"flex flex-col"}>
        <DynamicTabItems
          tabItems={}
          activeTabItem={}
          newTabItem={}
          onActiveTabItem={}
          onDisActiveTabItem={(tabItem) => {}}
          onCloseTabItem={(tabItem) => {}}
          onCloseOtherTabItems={(tabItems) => {}}
          onCloseLeftTabItems={(tabItems) => {}}
          onCloseRightTabItems={(tabItems) => {}}
          onRenameTabItem={(item: DynamicTabsItem) => {}}
        />
        <SVGButton name={"plus"} />
      </div>
    </div>
  );
};
