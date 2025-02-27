import { z } from "zod";

export enum DataSourceType {
  PostgreSQL = "PostgreSQL",
  MySQL = "MySQL",
  SQLServer = "SQLServer",
  Oracle = "Oracle",
  SQLite = "SQLite",
}
export const DataSourceTypeSchema = z.enum([
  "PostgreSQL",
  "MySQL",
  "SQLServer",
  "Oracle",
  "SQLite",
]);
