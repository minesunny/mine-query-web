import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import React, { memo } from "react";
import { ExecuteLog, Log } from "@/models/log";

const columnHelper = createColumnHelper<Log<any>>();
const contentGenerate = (log: Log<any>) => {
  switch (log.type) {
    case "EVENT":
      return `Open connection to ${log.databaseName}`;
    case "EXECUTE":
      const content = log.content as ExecuteLog;
      return `Execute statement ${content.statement}`;
    default:
      return "";
  }
};
const formatTimestampToDate = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp, 10));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};
const columns = [
  columnHelper.accessor((row) => row.time, {
    id: "time",
    cell: (info) => <i>{"[" + formatTimestampToDate(info.getValue()) + "]"}</i>,

    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("content", {
    cell: (info) => {
      const log = info.row.original;
      return contentGenerate(log);
    },
    footer: (info) => info.column.id,
  }),
];

export const LogTable: React.FC<{
  logs: Log<any>[];
}> = memo(({ logs }) => {
  const [data, _setData] = React.useState(() => [...logs]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full h-full font-inter text-default">
      <div className={"h-6 w-full"}>placeholder</div>
      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={"px-2"}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

LogTable.displayName = "LogTable";
