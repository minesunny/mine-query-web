"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";
import { Toggle } from "@/components/ui/toggle";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <Toggle name="table" />
      <Toggle name="chartLine" />
      <Toggle name="refresh" />
      <Toggle name="toolWindowClock" />
      <Toggle name="runStop" />
      <Toggle name="add" />
      <Toggle name="remove" />
      <Toggle name="reset" />
      <Toggle name="previewChanges" />
      <Toggle name="submitDB" />
      <Toggle name="pin" />
      <Toggle name="search" />
      <Toggle name="settings" />

      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Toggle name="plus" />
          </Button>
        )}
        */}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
