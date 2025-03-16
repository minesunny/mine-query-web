// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import DatasourceTree from "@/components/tree/datasource-tree";
import { Result } from "@/components/result/result";
import { Button } from "@/components/ui/button/button";
import { event } from "@/store/Event";
import { DataSourceType, ObjectType } from "@/models";
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
            <DatasourceTree />
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
        defaultSize={25}
        className={"w-full overflow-y-scroll bg-secondary"}
      >
        <Button
          onClick={() => {
            event.publish("execute", {
              executeId: Math.random().toString(),
              executeContext: {
                dataSourceType: DataSourceType.SQLite,
                dataBaseName: "main",
                schemaName: "main",
                objectName: "main",
                objectType: ObjectType.TABLE,
                editorId: "string",
                query: "select * from a",
                dataSourceId: "string",
                limit: 100,
                offset: 0,
                statement: {
                  statement: "select * from a " + Math.random().toString(),
                },
              },
            });
          }}
        >
          click
        </Button>
        <Result />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
