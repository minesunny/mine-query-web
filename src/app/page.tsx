// app/page.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Result } from "@/components/result/result";
import { Button } from "@/components/ui/button/button";
import { event } from "@/store/Event";
import { DataSourceType, ObjectType } from "@/models";
import DataSourceTree from "@/components/tree/datasource-tree";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useEnvStoreStore } from "@/store/Env";
import { EditorTabs } from "@/components/ui/tabs/editor-tabs";
export default function Page() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<ImperativePanelHandle>(null);
  const divRef = useRef(null);
  const { collapsible } = useEnvStoreStore((state) => state.env);
  const setEditorHeight = useEnvStoreStore((state) => state.setEditorHeight);
  const [min, setMin] = useState(0);
  useEffect(() => {
    setMounted(true);
    if (divRef.current && mounted) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (divRef.current == entry.target) {
            const width = entry.contentRect.width;
            setEditorHeight(entry.contentRect.height);
            setMin(parseFloat((200 / width).toFixed(2)) * 100);
          }
        }
      });
      resizeObserver.observe(divRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [mounted]);
  useEffect(() => {
    collapsible && ref?.current?.collapse();
    !collapsible && ref?.current?.expand();
  }, [collapsible]);
  if (!mounted) return null;
  return (
    <ResizablePanelGroup direction="vertical" className="border-0">
      <ResizablePanel defaultSize={75}>
        <div className={"h-full w-full"} ref={divRef}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              defaultSize={10}
              collapsedSize={0}
              collapsible={collapsible}
              minSize={min}
              className={"border-0 bg-secondary"}
              ref={ref}
            >
              <DataSourceTree />
            </ResizablePanel>
            {!collapsible && <ResizableHandle />}
            <ResizablePanel>
              <EditorTabs />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={10}
              minSize={min}
              className={"border-0 bg-secondary"}
            >
              right
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
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
