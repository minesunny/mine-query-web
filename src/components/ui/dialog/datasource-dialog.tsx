import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";

import { DataSourceForm } from "@/components/ui/form";
import { useTranslation } from "next-i18next";
import { DataSource, DataSourceType } from "@/models";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button/button";

/**
 *
 * @param dataSourceId edit a datasource need dataSourceId
 * @param dataSourceType  add a dataSource need dataSourceType
 * @param dataSourceProps copy a dataSource need copied data
 * @constructor
 */
const DataSourceDialog: React.FC = ({
  dataSourceId,
  dataSourceType,
  dataSourceProps,
}: {
  dataSourceType?: DataSourceType;
  dataSourceId?: string;
  dataSourceProps?: DataSource;
}) => {
  const { t } = useTranslation("DatabaseBundle");

  const optionContentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!optionContentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === optionContentRef.current) {
          // scroll 的parent 用h-full 会导致 scroll高度计算存在问题，这里需要手动计算下
          // title 27，gap-16, 名称 26，gap-12, 注释 26，gap-12,tabsList 36, gay-16,footer 24,margin-bottom 20
          setHeight(entry.contentRect.height - 220);
        }
      }
    });
    observer.observe(optionContentRef.current);
    return () => observer.disconnect(); // 清理观察器
  }, []);

  return (
    <Dialog>
      <DialogContent
        resizeable={true}
        size={{
          width: 700,
          height: 600,
        }}
        minWidth={700}
        minHeight={600}
        ref={optionContentRef}
        onOpenAutoFocus={(event) => {
          const height = (event.target as HTMLDivElement).offsetHeight;
          setHeight(height - 220);
        }}
      >
        <DialogHeader windowControl={false}>
          <DialogTitle>
            {t("toolwindow.stripe.Database.inDataGrip")}
          </DialogTitle>
        </DialogHeader>
        <DataSourceForm
          height={height}
          dataSourceId={dataSourceId}
          dataSourceProps={dataSourceProps}
          dataSourceType={dataSourceType}
          onSubmit={async (data) => {
            console.log(data);
          }}
        />
        <DialogFooter
          className={"mb-5 flex h-6 w-full justify-end space-x-8 pr-4"}
        >
          <Button className={"my-0 h-6 w-20"}>{t("Button.confirm")}</Button>
          <DialogClose asChild>
            <Button className={"my-0 h-6 w-20"}>{t("Button.cancel")}</Button>
          </DialogClose>
          <Button className={"my-0 h-6 w-20"}>{t("Button.apply")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export { DataSourceDialog };
