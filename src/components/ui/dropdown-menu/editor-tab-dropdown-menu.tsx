import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu/context-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input/input";
import * as React from "react";
import { useTranslation } from "next-i18next";
import { forwardRef, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
type EditorTabDropdownMenuProps = {
  item: {
    id: string;
    label: string;
  };
  closeLeftTabs?: (id: string) => void;
  closeRightTabs?: (id: string) => void;
  closeOtherTabs?: (id: string) => void;
  closeAllTabs?: (id: string) => void;
  renameTab: (id: string, newName: string) => void;
};
const EditorTabDropdownMenu = forwardRef<
  HTMLButtonElement,
  EditorTabDropdownMenuProps
>(
  (
    {
      item,
      closeLeftTabs,
      closeRightTabs,
      closeOtherTabs,
      closeAllTabs,
      renameTab,
    },
    ref,
  ) => {
    const { t } = useTranslation("DatabaseBundle");
    const [value, setValue] = useState<{
      id: string;
      label: string;
    }>({ id: "", label: "" });
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
      setValue(item);
    }, [item]);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <ContextMenu>
          <ContextMenuTrigger ref={ref} />
          <ContextMenuContent>
            <ContextMenuItem
              inset
              onClick={() => closeOtherTabs && closeOtherTabs(value.id)}
              disabled={!closeOtherTabs}
            >
              {t("tab.close.other.tabs")}
            </ContextMenuItem>
            <ContextMenuItem
              inset
              onClick={() => closeLeftTabs && closeLeftTabs(value.id)}
              disabled={!closeLeftTabs}
            >
              {t("tab.close.left.tabs")}
            </ContextMenuItem>

            <ContextMenuItem
              inset
              onClick={() => closeRightTabs && closeRightTabs(value.id)}
              disabled={!closeRightTabs}
            >
              {t("tab.close.right.tabs")}
            </ContextMenuItem>
            {/*<ContextMenuItem*/}
            {/*  inset*/}
            {/*  onClick={() => closeAllTabs && closeAllTabs(value.id)}*/}
            {/*  disabled={!closeAllTabs}*/}
            {/*>*/}
            {/*  {t("closeAllTabs")}*/}
            {/*</ContextMenuItem>*/}
            <DialogTrigger asChild>
              <ContextMenuItem className={"indent-6"}>
                <span>{t("tab.rename")}</span>
              </ContextMenuItem>
            </DialogTrigger>
          </ContextMenuContent>
        </ContextMenu>
        <DialogContent
          resizeable={false}
          size={{
            width: 345,
            height: 85,
          }}
        >
          <DialogHeader windowControl={false}>
            <DialogTitle>Rename Tab</DialogTitle>
          </DialogHeader>
          <div className={"w-full rounded-b-lg px-4 py-1"}>
            <Input
              type="text"
              value={value.label}
              placeholder="Name"
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  renameTab(value.id, value.label);
                  setOpen(false);
                }
              }}
              onChange={(e) =>
                setValue({
                  id: value.id,
                  label: e.target.value,
                })
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);
EditorTabDropdownMenu.displayName = "EditorTabDropdownMenu";
export { EditorTabDropdownMenu };
