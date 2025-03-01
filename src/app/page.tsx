// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { PageContent } from "@/app/page/content/PageContent";
import DatasourceTree from "@/components/tree/datasource-tree";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
      <ResizablePanel
        defaultSize={15}
        className={"h-full min-w-36 overflow-y-scroll bg-secondary"}
      >
        <DatasourceTree />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={85}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={75}>
            {/*<SQLEditor />*/}
            <PageContent />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} className={"bg-secondary"}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold  bg-teal-1">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
