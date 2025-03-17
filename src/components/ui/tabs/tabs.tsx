"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Separator } from "../separator";

import { cn } from "@/lib/utils";
import "./theme.css";
import { SVG } from "@/components/ui/Icons";
const Tabs = TabsPrimitive.Root;

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
    <div className={"mr-1 flex flex-1 flex-row items-center justify-center"}>
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

const DynamicTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    tabId: string;
    close?: (id: string) => void;
    leadingIcon?: React.ReactNode;
  }
>(({ className, children, tabId, close, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "group " +
        "inline-flex h-full flex-col items-center whitespace-nowrap rounded-md pt-1 text-sm font-medium focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <div className={"mr-1 flex flex-1 flex-row items-center justify-center"}>
      <div id="content" className={"mr-[16px] flex h-[16px] flex-1"}>
        {children}
      </div>
      {close && (
        <div
          id="closeIcon"
          className={`tab-item-icon mr-1 h-[16px] w-[16px] rounded-full`}
          onClick={(event) => {
            close(tabId);
            event.stopPropagation();
          }}
        >
          <SVG name={"closeSmall"} height="16px" width="16px" />
        </div>
      )}
    </div>
    <Separator
      className={
        "h-[3px] w-full rounded-sm dark:group-data-[state=active]:bg-blue-6"
      }
      id="separator"
    />
  </TabsPrimitive.Trigger>
));

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
