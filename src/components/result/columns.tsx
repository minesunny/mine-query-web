"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "../ui/table/data-table-column-header";
import { DataTableRowActions } from "../ui/table/data-table-row-actions";
import { RowColumn } from "@/models/column";
import { CellValue, RowValue } from "@/models/value";

export const ResultColumns = (columnMeta: RowColumn): ColumnDef<RowValue>[] => {
  const columnHeader: ColumnDef<RowValue>[] = columnMeta.map((value, index) => {
    return {
      accessorKey: `${index}`,
      size: 100,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={value.name} />
      ),
      accessorFn: (row) => row[index],
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      cell: ({ getValue }) => {
        const value = getValue() as CellValue;
        return <div>{value.value}</div>;
      },
    };
  });
  return [columns[0], ...columnHeader, ...columns.toSpliced(0, 1)];
};

const columns: ColumnDef<RowValue>[] = [
  {
    id: "select",
    enableResizing: true,
    size: 100,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "id",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    size: 100,
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
