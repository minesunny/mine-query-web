type CellColumn = {
  name: string;
  type: string;
  size?: number;
  nullable?: boolean;
  primaryKey?: boolean;
  autoIncrement?: boolean;
};

type RowColumn = CellColumn[];

export type { RowColumn, CellColumn };
