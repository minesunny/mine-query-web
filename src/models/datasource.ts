import { Driver, DriverSchema } from "@/models/driver";
import { DataSourceType } from "@/models/datasource-type";
import { z } from "zod";

export type DataSourceSchema = {
  dataBaseName: string;
  dataSourceType: DataSourceType;
  driver: Driver;
  host: string;
  name: string;
  port: number;
  username: string;
};
export const DataSourceSchema = z.object({
  dataBaseName: z.string(),
  dataSourceType: z.string(),
  driver: DriverSchema,
  host: z.string(),
  name: z.string(),
  port: z.number(),
  username: z.string(),
});
