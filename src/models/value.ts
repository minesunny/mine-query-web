type CellValue = {
  name: string;
  value: string;
  type: string;
  size?: number;
  nullable?: boolean;
  primaryKey?: boolean;
  autoIncrement: boolean;
};

type RowValue = CellValue[];
export type { CellValue, RowValue };
