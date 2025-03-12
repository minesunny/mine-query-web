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
import TableDemo from "./page/content/TableDemo";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <ResizablePanelGroup direction="vertical" className="rounded-lg border-0">
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={10} className={"bg-secondary border-0"}>
            left
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>mid</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={10} className={"bg-secondary border-0"}>
            right
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel
        defaultSize={20}
        className={"w-full overflow-y-scroll bg-secondary"}
      >
        <TableDemo />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
