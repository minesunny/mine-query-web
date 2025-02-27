import { DataSourceType, DataSourceTypeSchema } from "@/models/datasource-type";
import { z } from "zod";

export type Driver = {
  className: string;
  dataSourceType: DataSourceType;
  id: number;
  name: string;
  path: string;
  url: string;
};
export const DriverSchema = z.object({
  className: z.string(),
  dataSourceType: DataSourceTypeSchema,
  id: z.number(),
  name: z.string(),
  path: z.string(),
  url: z.string(),
});
