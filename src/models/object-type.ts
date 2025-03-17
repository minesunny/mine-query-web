import { z } from "zod";

export enum ObjectType {
  DATASOURCE = "DATASOURCE",
  DATABASE = "DATABASE",
  SCHEMA = "SCHEMA",
  TABLE = "TABLE",
  VIEW = "VIEW",
  COLUMN = "COLUMN",
}
export const ObjectTypeTypeSchema = z.enum([
  "DATASOURCE",
  "DATABASE",
  "SCHEMA",
  "TABLE",
  "VIEW",
  "COLUMN",
]);
