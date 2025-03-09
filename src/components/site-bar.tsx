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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-secondary border-b border-primary">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center ml-auto space-x-4">
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
export function SiteLeft() {
  return (
    <div className={"h-full w-8 bg-secondary border-r border-primary"}></div>
  );
}
export function SiteRight() {
  return (
    <div className={"h-full w-8 bg-secondary border-l border-primary"}></div>
  );
}

export function SiteFooter() {
  const useSiteBarState = useSiteBarStore((state) => state.siteBarOption);
  return (
    <div
      className={
        "h-8 w-full bg-secondary flex justify-between px-8 items-center"
      }
    >
      <div id="path" className="w-[500px] flex flex-row">
        {/*<div>useSiteBarState</div>*/}
        {/*<div>-</div>*/}
        {/*<div>useSiteBarState</div>*/}
        {/*<div>-</div>*/}
        {/*<div>useSiteBarState</div>*/}
      </div>
      <div className={"flex gap-6 items-center w-50"}>
        <LineSplitSelect />
        <EncodingSelect />
      </div>
    </div>
  );
}
const EncodingSelect: React.FC = () => {
  const useSiteBarState = useSiteBarStore((state) => state.siteBarOption);
  const updateSiteBar = useSiteBarStore((state) => state.updateSiteBarOption);
  return (
    <Select
      defaultValue={useSiteBarState.encoding}
      onValueChange={(value) => {
        updateSiteBar({ encoding: value as (typeof Encoding)[number] });
      }}
    >
      <SelectTrigger className="h-6 w-20 text-xs border-0 rounded-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger id="encoding">
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
      <SelectContent className={"border-0 flex flex-row"}>
        <SelectGroup>
          <SelectLabel>File Encoding</SelectLabel>
          {Encoding.map((item) => {
            return (
              <SelectItem
                key={item}
                value={item}
                className={"text-xs h-6 w-full"}
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
  return (
    <Select
      defaultValue={useSiteBarState.editorLineSplit}
      onValueChange={(value) => {
        updateSiteBar({ editorLineSplit: value as (typeof LineSplit)[number] });
      }}
    >
      <SelectTrigger className="h-6 w-20 text-xs border-0 rounded-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger id="encoding">
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
      <SelectContent className={"border-0 flex flex-row"}>
        <SelectGroup>
          <SelectLabel>Line Separator</SelectLabel>
          <SelectItem
            value="CRLF"
            className={"text-xs h-6 w-full"}
            muteText={
              <span className="text-xs text-muted indent-1">
                - Windows(\r\n)
              </span>
            }
          >
            CRLF
          </SelectItem>
          <SelectItem
            value="CR"
            className={"text-xs h-6 w-full"}
            muteText={
              <span className="text-xs text-muted indent-1">
                - Classic Mac OS (\r)
              </span>
            }
          >
            CR
          </SelectItem>
          <SelectItem
            value="LF"
            className={"text-xs h-6 w-full"}
            muteText={
              <span className="text-xs text-muted indent-1">
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
