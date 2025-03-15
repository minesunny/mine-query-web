import { RowColumn } from "@/models/column";
import { DataTable } from "../ui/table/data-table";
import { RowValue } from "@/models/value";
import { ResultColumns } from "./columns";

import React, { memo } from "react";

export const ResultSetTable: React.FC<{
  editorId: string;
  resultId: string;
  columns: RowColumn;
  data: RowValue[];
}> = memo(({ editorId, resultId, columns, data }) => {
  return <DataTable columns={ResultColumns(columns)} data={data} />;
});

ResultSetTable.displayName = "ResultSetTable";
