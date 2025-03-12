import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";

import { SQLEditor } from "@/components/editor/sql-editor";

export function PageContent() {
  return (
    <ResizablePanelGroup direction="vertical" className="rounded-lg border-0">
      <ResizablePanel
        defaultSize={55}
        className={"h-full min-w-36 overflow-y-scroll"}
      >
        <SQLEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={45}>
        {/*<ResultTabContent />*/}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
