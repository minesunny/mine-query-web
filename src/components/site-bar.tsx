"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { useSiteBarStore } from "@/store/SiteBarStore";
import { LineSplit, Encoding } from "@/models/const";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
        "h-8 w-full bg-secondary border-t border-primary flex justify-between px-5 items-center"
      }
    >
      <div id="path" className="w-[500px] flex flex-row">
        <div>useSiteBarState</div>
        <div>-</div>
        <div>useSiteBarState</div>
        <div>-</div>
        <div>useSiteBarState</div>
      </div>
      <div className={"flex gap-6 items-center w-[500px]"}>
        <div id="position">1:18</div>

        {/* select  */}
        <div id="lineSplit">CRLF</div>

        {/* select  */}

        <Select>
          <SelectTrigger className="h-4 w-[100px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger id="encoding">
                  <SelectValue placeholder="Theme"></SelectValue>
                </TooltipTrigger>
                <TooltipContent>
                  <p>缩进4个空格</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        {/* select  */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger id="space" className="h-6 text-center">
              4个空格
            </TooltipTrigger>
            <TooltipContent>
              <p>缩进4个空格</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
