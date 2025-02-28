import { TabItem, TableListProps } from "@/components/tab-content/tab-list";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { ResultTabContent } from "@/components/tab-content/result-tab-content";

import { DynamicTabs } from "@/components/tabs/dynamic-tabs";
import { Dialog } from "@radix-ui/react-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu/context-menu";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";

export function PageContent() {
  return (
    <ResizablePanelGroup direction="vertical" className="rounded-lg border-0">
      <ResizablePanel
        defaultSize={55}
        className={"h-full min-w-36 overflow-y-scroll"}
      >
        {/*<Dialog>*/}
        {/*  <ContextMenu>*/}
        {/*    <ContextMenuTrigger>Right click</ContextMenuTrigger>*/}
        {/*    <ContextMenuContent>*/}
        {/*      <ContextMenuItem>Open</ContextMenuItem>*/}
        {/*      <ContextMenuItem>Download</ContextMenuItem>*/}
        {/*      <DialogTrigger asChild>*/}
        {/*        <ContextMenuItem>*/}
        {/*          <span>Delete</span>*/}
        {/*        </ContextMenuItem>*/}
        {/*      </DialogTrigger>*/}
        {/*    </ContextMenuContent>*/}
        {/*  </ContextMenu>*/}
        {/*  <DialogContent>*/}
        {/*    <DialogHeader>*/}
        {/*      <DialogTitle>Are you absolutely sure?</DialogTitle>*/}
        {/*      <DialogDescription>*/}
        {/*        This action cannot be undone. Are you sure you want to*/}
        {/*        permanently delete this file from our servers?*/}
        {/*      </DialogDescription>*/}
        {/*    </DialogHeader>*/}
        {/*    <DialogFooter>*/}
        {/*      <Button type="submit">Confirm</Button>*/}
        {/*    </DialogFooter>*/}
        {/*  </DialogContent>*/}
        {/*</Dialog>*/}

        <DynamicTabs
          items={[
            {
              id: "1",
              label: "SQL Editor",
              content: <div>{Math.random() + "abc"}</div>,
            },
            {
              id: "2",
              label: "SQL Editor 2",
              content: <div>{new Date().getTime() + "def"}</div>,
            },
          ]}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={45}>
        <ResultTabContent />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
