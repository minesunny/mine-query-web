"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Separator } from "../separator";

import { cn } from "@/lib/utils";
import "./theme.css";
import { SVG } from "@/components/ui/Icons";
import { useEffect, useRef, useState } from "react";
const Tabs = TabsPrimitive.Root;
type TabItemProps = {
  id: string;
  key: string;
  type: "Editor" | "result" | "Welcome";
  label: string;
  closable?: boolean;
};
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "bg-muted text-muted-foreground inline-flex h-9 items-center rounded-lg",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "group " +
        "inline-flex h-full flex-col items-center whitespace-nowrap rounded-md pt-1 text-sm font-medium focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <div className={"flex flex-1 flex-row items-center justify-center px-1"}>
      {children}
    </div>
    <Separator
      className={
        "h-[3px] w-full rounded-sm dark:group-data-[state=active]:bg-blue-6"
      }
      id="separator"
    />
  </TabsPrimitive.Trigger>
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
function CloseSVGButton({
  tabItem,
  close,
  saved,
}: {
  tabItem: TabItemProps;
  close?: (tabItem: TabItemProps) => void;
  saved: boolean;
}) {
  const [iconName, setIconName] = useState("closeSmall");
  useEffect(() => {
    if (!saved) {
      setIconName("dot");
    } else if (close) {
      setIconName("closeSmall");
    }
  }, [saved]);
  return (
    <div
      id="closeIcon"
      className={`tab-item-icon mr-1 h-[16px] w-[16px] rounded-full`}
      onClick={(event) => {
        close && close(tabItem);
        event.stopPropagation();
      }}
      onMouseEnter={() => {
        if (close) {
          setIconName("closeSmall");
        }
      }}
      onMouseLeave={() => {
        if (!saved) {
          setIconName("dot");
        } else if (close) {
          setIconName("closeSmall");
        }
      }}
    >
      <SVG name={iconName} height="16px" width="16px" />
    </div>
  );
}
const DynamicTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    tabItem: TabItemProps;
    close?: (tabItem: TabItemProps) => void;
    leadingIcon?: React.ReactNode;
    saved: boolean;
    saveAction?: (tab: TabItemProps) => void;
  }
>(
  (
    { className, children, tabItem, saved, saveAction, close, ...props },
    ref,
  ) => {
    const alertRef = useRef<HTMLButtonElement>(null);
    const [closeState, setCloseState] = React.useState(false);
    useEffect(() => {
      setCloseState(saved);
    }, [saved]);
    function closeAction(tabItem: TabItemProps) {
      if (closeState) {
        close && close(tabItem);
      }
      setCloseState(true);
      if (alertRef.current) {
        const event = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        });
        alertRef.current.dispatchEvent(event);
      }
    }
    return (
      <>
        <TabsTrigger ref={ref} {...props}>
          <div
            className={
              "mr-1 flex w-fit flex-1 flex-row items-center justify-center"
            }
          >
            <div
              id="content"
              className={"mr-2 flex h-[16px] flex-1 font-inter"}
            >
              {tabItem.label}
            </div>
            <CloseSVGButton
              tabItem={tabItem}
              close={closeAction}
              saved={saved}
            />
          </div>
        </TabsTrigger>
        {/*{!saved && (*/}
        {/*  <TabCloseAlertDialog*/}
        {/*    ref={alertRef}*/}
        {/*    tab={tabItem}*/}
        {/*    saveAction={function (tab: TabItemProps): void {*/}
        {/*      saveAction && saveAction(tab);*/}
        {/*      setCloseState(true);*/}
        {/*      closeAction(tab);*/}
        {/*    }}*/}
        {/*    cancelAction={function (tab: TabItemProps): void {*/}
        {/*      setCloseState(false);*/}
        {/*    }}*/}
        {/*    notSaveAction={function (tab: TabItemProps): void {*/}
        {/*      closeAction(tab);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
      </>
    );
  },
);

DynamicTabsTrigger.displayName = "DynamicTabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("border-0", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, DynamicTabsTrigger };

export type { TabItemProps };
