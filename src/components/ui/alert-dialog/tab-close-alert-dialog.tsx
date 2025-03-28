import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import * as React from "react";
import { useTranslation } from "next-i18next";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { TabItemProps } from "@/components/ui/tabs";
const TabCloseAlertDialog = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger> & {
    tab: TabItemProps;
    close?: (tab: TabItemProps) => void;
    saveAction: (tab: TabItemProps) => void;
    cancelAction: (tab: TabItemProps) => void;
    notSaveAction: (tab: TabItemProps) => void;
    keepStatus?: (tab: TabItemProps) => void;
  }
>(
  (
    {
      className,
      children,
      tab,
      saveAction,
      cancelAction,
      close,
      notSaveAction,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    return (
      <AlertDialog>
        <AlertDialogTrigger ref={ref} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                saveAction(tab);
              }}
            >
              {t("save")}
            </AlertDialogAction>

            <AlertDialogAction
              onClick={() => {
                notSaveAction(tab);
              }}
            >
              {t("don't save")}
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                cancelAction(tab);
              }}
            >
              {t("cancel")}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

TabCloseAlertDialog.displayName = "TabCloseAlertDialog";
export { TabCloseAlertDialog };
