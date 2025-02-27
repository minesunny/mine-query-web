import { z } from "zod";

export enum ObjectType {
  DATASOURCE = "DATASOURCE",
  DATABASE   = "DATABASE",
  SCHEMA = "SCHEMA",
  TABLE = "TABLE",
  COLUMN = "COLUMN",
}
export const ObjectTypeTypeSchema = z.enum([
  "DATASOURCE",
  "DATABASE",
  "SCHEMA",
  "TABLE",
  "COLUMN",
]);
