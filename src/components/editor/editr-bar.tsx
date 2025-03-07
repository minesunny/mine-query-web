import { useSQLEditorEnvStore } from "@/store/SQLEditorEnvStore";
import React, { useState } from "react";
import "./theme.css";
import { Button } from "@/components/ui/button/button";
import { SVG } from "@/components/ui/Icons";
import { Separator } from "@/components/ui/separator";
import {
  SQLEditorBarSourceSelect,
  SQLEditorBarTransactionSelect,
} from "@/components/editor/editor-bar-select";

const SQLEditorBar: React.FC<{
  editorId: string;
}> = ({ editorId }) => {
  const updateSQLEditor = useSQLEditorEnvStore((state) => state.updateEditor);
  const editor = useSQLEditorEnvStore((state) => state.getEditor(editorId));
  return (
    <div className="h-9 w-300 flex border-0 bg-secondary items-center">
      <Separator orientation="vertical" className={"mx-6 h-5"} />
      <Button variant={"icon"} className={"editor-bar-button h-6 w-6"}>
        <SVG name={"run"} />
      </Button>
      <Separator
        orientation="vertical"
        className={"editor-bar-button-split mx-2 h-5"}
      />

      <Button variant={"icon"} className={"editor-bar-button h-6 w-6"}>
        <SVG name={"history"} />
      </Button>
      <Separator
        orientation="vertical"
        className={"editor-bar-button-split mx-2 h-5"}
      />

      <Button variant={"icon"} className={"editor-bar-button h-6 w-6"}>
        <SVG name={"viewParameters"} />
      </Button>
      <Separator
        orientation="vertical"
        className={"editor-bar-button-split mx-2 h-5"}
      />
      <Button variant={"icon"} className={"editor-bar-button h-6 w-6"}>
        <SVG name={"settings"} />
      </Button>
      <Separator
        orientation="vertical"
        className={"editor-bar-button-split mx-2 h-5"}
      />
      <SQLEditorBarTransactionSelect editorId={editorId} />
      <Separator
        orientation="vertical"
        className={"editor-bar-button-split mx-2 h-5"}
      />
      <SQLEditorBarSourceSelect editorId={editorId} />
      <Separator
        orientation="vertical"
        className={"editor-bar-button-split mx-2 h-5"}
      />
      <Button
        variant={"icon"}
        className={"editor-bar-button h-6 w-6 disabled:!cursor-not-allowed"}
        disabled={editor == undefined || editor.running}
      >
        <SVG name={"runStop"} />
      </Button>
      <Separator
        orientation="vertical"
        className={"editor-bar-button-split mx-2 h-5"}
      />
    </div>
  );
};
export { SQLEditorBar };
