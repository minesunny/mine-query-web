"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { useSiteBarStore } from "@/store/SiteBarStore";
import { LineSplit, Encoding, LineSplitLiteral } from "@/models/const";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import * as React from "react";

import { useEnvStoreStore } from "@/store/Env";
import { DynamicToggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary bg-secondary">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
export function SiteLeft() {
  const setCollapsible = useEnvStoreStore((state) => state.setCollapsible);
  const { collapsible } = useEnvStoreStore((state) => state.env);
  return (
    <div
      className={
        "flex h-full w-8 flex-row justify-center border-r border-primary bg-secondary pt-1"
      }
    >
      <DynamicToggle
        name={"dbms"}
        onClick={() => {
          setCollapsible(!collapsible);
        }}
      />
    </div>
  );
}
export function SiteRight() {
  return (
    <div className={"h-full w-8 border-l border-primary bg-secondary"}></div>
  );
}

export function SiteFooter() {
  const useSiteBarState = useSiteBarStore((state) => state.siteBarOption);
  return (
    <div
      className={
        "flex h-auto w-full items-center justify-between border-t border-primary bg-secondary px-8"
      }
    >
      <div id="path" className="flex w-[500px] flex-row">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger id="encoding" asChild>
              <Button>Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className={"text-xs"}>
                {"File Encoding:" + useSiteBarState.encoding}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className={"w-50 flex items-center gap-6"}>
        <LineSplitSelect />
        <EncodingSelect />
      </div>
    </div>
  );
}
const EncodingSelect: React.FC = () => {
  const useSiteBarState = useSiteBarStore((state) => state.siteBarOption);
  const updateSiteBar = useSiteBarStore((state) => state.updateSiteBarOption);
  const [open, setOpen] = React.useState(false);
  return (
    <Select
      defaultValue={useSiteBarState.encoding}
      onValueChange={(value) => {
        updateSiteBar({ encoding: value as (typeof Encoding)[number] });
      }}
    >
      <SelectTrigger
        className="h-6 w-20 rounded-sm border-0 text-xs"
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <TooltipProvider>
          <Tooltip open={open}>
            <TooltipTrigger id="encoding" asChild>
              <SelectValue
                placeholder="Theme"
                className={"w-full"}
              ></SelectValue>
            </TooltipTrigger>
            <TooltipContent>
              <p className={"text-xs"}>
                {"File Encoding:" + useSiteBarState.encoding}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SelectTrigger>
      <SelectContent className={"flex flex-row border-0"}>
        <SelectGroup>
          <SelectLabel>File Encoding</SelectLabel>
          {Encoding.map((item) => {
            return (
              <SelectItem
                key={item}
                value={item}
                className={"h-6 w-full text-xs"}
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
const LineSplitSelect: React.FC = () => {
  const useSiteBarState = useSiteBarStore((state) => state.siteBarOption);
  const updateSiteBar = useSiteBarStore((state) => state.updateSiteBarOption);
  const [open, setOpen] = React.useState(false);

  return (
    <Select
      defaultValue={useSiteBarState.editorLineSplit}
      onValueChange={(value) => {
        updateSiteBar({ editorLineSplit: value as (typeof LineSplit)[number] });
      }}
    >
      <SelectTrigger
        className="h-6 w-20 rounded-sm border-0 text-xs"
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <TooltipProvider>
          <Tooltip open={open}>
            <TooltipTrigger id="lineSeparator" asChild>
              <SelectValue
                placeholder="Theme"
                className={"w-full"}
              ></SelectValue>
            </TooltipTrigger>
            <TooltipContent>
              <p className={"text-xs"}>
                {"Line Separator:" +
                  LineSplitLiteral[useSiteBarState.editorLineSplit]}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SelectTrigger>
      <SelectContent className={"flex flex-row border-0"}>
        <SelectGroup>
          <SelectLabel>Line Separator</SelectLabel>
          <SelectItem
            value="CRLF"
            className={"h-6 w-full text-xs"}
            muteText={
              <span className="text-muted indent-1 text-xs">
                - Windows(\r\n)
              </span>
            }
          >
            CRLF
          </SelectItem>
          <SelectItem
            value="CR"
            className={"h-6 w-full text-xs"}
            muteText={
              <span className="text-muted indent-1 text-xs">
                - Classic Mac OS (\r)
              </span>
            }
          >
            CR
          </SelectItem>
          <SelectItem
            value="LF"
            className={"h-6 w-full text-xs"}
            muteText={
              <span className="text-muted indent-1 text-xs">
                - Unix and macOS (\n)
              </span>
            }
          >
            LF
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
