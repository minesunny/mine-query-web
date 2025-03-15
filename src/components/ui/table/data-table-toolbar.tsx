"use client";

import { Table } from "@tanstack/react-table";

import { Button, SVGButton } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <SVGButton name="table" />
      <SVGButton name="chartLine" />
      <SVGButton name="refresh" />
      <SVGButton name="toolWindowClock" />
      <SVGButton name="runStop" />
      <SVGButton name="add" />
      <SVGButton name="remove" />
      <SVGButton name="reset" />
      <SVGButton name="previewChanges" />
      <SVGButton name="submitDB" />
      <SVGButton name="pin" />
      <SVGButton name="search" />
      <SVGButton name="settings" />

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
            <SVGButton name="plus" />
          </Button>
        )}
        */}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
