import { useSQLEditorEnvStore } from "@/store/SQLEditorEnvStore";
import React, { useState } from "react";
import "./theme.css";
import { Button, SVGButton } from "@/components/ui/button/button";
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
      <SVGButton name={"run"} />
      <SVGButton name={"history"} />

      <SVGButton name={"viewParameters"} />

      <SVGButton name={"settings"} />

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
      <SVGButton name={"runStop"} />

    </div>
  );
};
export { SQLEditorBar };
