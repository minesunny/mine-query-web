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
