import React, { useEffect, useState } from "react";

import { event } from "@/store/Event";
import { executeApi } from "@/api/execute-api";
import { ExecuteResultItem } from "@/models/execute";
import { ResultSetTable } from "./result-set-table";
import { LogTable } from "@/components/result/log/log-table";
import { DataSourceType, ObjectType } from "@/models";

type ResultContentProps = {
  id: string;
  type?: "result" | "log";
  content?: ExecuteResultItem;
};
export const Result: React.FC = () => {
  // const [items, setItems] = useState<DynamicTabsItem[]>([
  //   {
  //     id: "日志",
  //     label: "日志",
  //     closeable: false,
  //   },
  // ]);
  // const [active, setActive] = useState<DynamicTabsItem>(items[0]);
  // const [contents, setContents] = useState<ResultContentProps[]>([
  //   {
  //     id: "日志",
  //     type: "log",
  //   },
  // ]);
  // useEffect(() => {
  //   const unsubscribe = event.subscribe("execute", (data) => {
  //     executeApi.executeStatement(data.executeContext).then((result) => {
  //       const resultItems: ExecuteResultItem[] = result.items;
  //       const newItems: DynamicTabsItem[] = [];
  //       const newContents: ResultContentProps[] = [];
  //       const existTabs: number[][] = [];
  //       resultItems.forEach((result, index) => {
  //         const find = contents.findIndex(
  //           (content) =>
  //             result.statement.statement + " " + index === content.id,
  //         );
  //         if (find != -1) {
  //           existTabs.push([find, index]);
  //         } else {
  //           newItems.push({
  //             id: result.statement.statement + " " + index,
  //             label: "test label " + index,
  //           });
  //           newContents.push({
  //             id: result.statement.statement + " " + index,
  //             content: result,
  //           });
  //         }
  //       });
  //       items.forEach((item, index) => {
  //         const find = existTabs.find((exist) => exist[0] == index);
  //         if (find) {
  //           newItems.unshift(item);
  //           newContents.unshift({
  //             id: item.id,
  //             content: resultItems[find[1]],
  //           });
  //         } else {
  //           newItems.unshift(item);
  //           newContents.unshift(contents[index]);
  //         }
  //       });
  //       newContents;
  //       setItems([...newItems]);
  //       setContents([...newContents]);
  //     });
  //   });
  //
  //   return () => {
  //     unsubscribe();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  //
  // return (
  // <div className={"h-full w-full"}>
  //   <div className={"flex flex-col"}>
  {
    /*    <DynamicTabItems*/
  }
  {
    /*      tabItems={items}*/
  }
  {
    /*      activeTabItem={active}*/
  }
  {
    /*      onActiveTabItem={(item) => {*/
  }
  {
    /*        setActive(item);*/
  }
  {
    /*      }}*/
  }
  {
    /*      onDisActiveTabItem={(tabItem) => {}}*/
  }
  {
    /*      onCloseTabItem={(tabItem) => {*/
  }
  {
    /*        setItems(items.filter((item) => item.id != tabItem.id));*/
  }
  {
    /*        setContents(contents.filter((item) => item.id != tabItem.id));*/
  }
  {
    /*      }}*/
  }
  {
    /*      onCloseOtherTabItems={(tabItems) => {*/
  }
  {
    /*        setItems(*/
  }
  {
    /*          items.filter(*/
  }
  {
    /*            (item) => !tabItems.find((tab) => tab.id === item.id),*/
  }
  {
    /*          ),*/
  }
  {
    /*        );*/
  }
  {
    /*        setItems(*/
  }
  {
    /*          items.filter(*/
  }
  {
    /*            (item) => !tabItems.find((tab) => tab.id === item.id),*/
  }
  {
    /*          ),*/
  }
  {
    /*        );*/
  }
  {
    /*      }}*/
  }
  {
    /*      onCloseLeftTabItems={(tabItems) => {}}*/
  }
  {
    /*      onCloseRightTabItems={(tabItems) => {}}*/
  }
  {
    /*      onRenameTabItem={(item: DynamicTabsItem) => {*/
  }
  {
    /*        const index = items.findIndex((it) => it.id === item.id);*/
  }
  {
    /*        if (index == -1) {*/
  }
  {
    /*          return;*/
  }
  {
    /*        }*/
  }
  {
    /*        setItems([*/
  }
  {
    /*          ...items.slice(0, index),*/
  }
  {
    /*          item,*/
  }
  {
    /*          ...items.slice(index + 1),*/
  }
  {
    /*        ]);*/
  }
  {
    /*      }}*/
  }
  {
    /*    />*/
  }
  {
    /*    {contents &&*/
  }
  {
    /*      contents.map((content, index) => {*/
  }
  {
    /*        if (content.content) {*/
  }
  {
    /*          return (*/
  }
  {
    /*            <div*/
  }
  {
    /*              key={index}*/
  }
  {
    /*              className={`${active.id == content.id ? "visible" : "hidden"} h-full w-full`}*/
  }
  {
    /*            >*/
  }
  {
    /*              <ResultSetTable*/
  }
  {
    /*                editorId=""*/
  }
  {
    /*                resultId=""*/
  }
  {
    /*                columns={content.content.columns}*/
  }
  {
    /*                data={content.content.values}*/
  }
  {
    /*              />*/
  }
  {
    /*            </div>*/
  }
  {
    /*          );*/
  }
  {
    /*        } else {*/
  }
  {
    /*          return (*/
  }
  {
    /*            <div*/
  }
  {
    /*              key={index}*/
  }
  {
    /*              className={`${active.id == content.id ? "visible" : "hidden"} h-full w-full`}*/
  }
  {
    /*            >*/
  }
  {
    /*              <LogTable*/
  }
  {
    /*                logs={[*/
  }
  {
    /*                  {*/
  }
  {
    /*                    type: "EVENT",*/
  }
  {
    /*                    id: "1",*/
  }
  {
    /*                    content: "test",*/
  }
  {
    /*                    time: new Date().getTime().toString(),*/
  }
  {
    /*                    dataSourceId: "1",*/
  }
  {
    /*                    dataSourceType: DataSourceType.SQLite,*/
  }
  {
    /*                    databaseName: "test",*/
  }
  {
    /*                    schemaName: "test",*/
  }
  {
    /*                    objectType: ObjectType.DATASOURCE,*/
  }
  {
    /*                    objectName: "test",*/
  }
  {
    /*                  },*/
  }
  {
    /*                ]}*/
  }
  {
    /*              />*/
  }
  {
    /*            </div>*/
  }
  {
    /*          );*/
  }
  {
    /*        }*/
  }
  {
    /*      })}*/
  }
  {
    /*  </div>*/
  }
  {
    /*</div>*/
  }
  // );
  return <></>;
};
