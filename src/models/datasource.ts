import { Driver, DriverSchema } from "@/models/driver";
import { DataSourceType } from "@/models/datasource-type";
import { z } from "zod";
import { i18n, Namespace, TFunction } from "i18next";
import { TimeZone } from "@/models/const";

export type DataSource = {
  dataSourceType: DataSourceType;
  driver?: Driver;
  driverId?: string;
  name: string;
  comment: string;
  //general
  host: string;
  port: number;
  authType: "PASSWORD";
  username: string;
  password: string;
  dataBaseName: string;
  url: string;
  connectionType: "default" | "In-Memory" | "URL only";

  //option;
  readonly: boolean;
  transactionControl:
    | "manual"
    | "auto"
    | "read uncommit"
    | "read commited"
    | "repeat read"
    | "sequence";
  switchArchitecture: "manual" | "auto" | "disabled";
  timezone: TimeZone;
  singleSessionMode: boolean;
  keepAlive: number;
  timeOut: number;
};

export function DataSourceSchema({
  t,
  i18n,
  ready,
}: {
  t: TFunction<Namespace, undefined>;
  i18n?: i18n;
  ready?: boolean;
  dataSourceType?: DataSourceType;
}) {
  return z.object({
    dataSourceType: z.string(),
    driver: DriverSchema,
    name: z.string(),
    comment: z.string(),

    // general
    host: z.string(),
    port: z.number(),
    authType: z.enum(["PASSWORD"]),
    username: z.string(),
    dataBaseName: z.string(),
    url: z.string(),
    connectionType: z.enum(["default", "In-Memory", "URL only"]),
    password: z.string().min(6, {
      message: t("datasource.password", { min: 6 }),
    }),

    // option
    readonly: z.boolean(),
    transactionControl: z.enum([
      "manual",
      "auto",
      "read uncommit",
      "read commited",
      "repeat read",
      "sequence",
    ]),
    switchArchitecture: z.enum(["manual", "auto", "disabled"]),
    timezone: z.enum(
      Intl.supportedValuesOf("timeZone") as [string, ...string[]],
    ),
    singleSessionMode: z.boolean(),
    keepAlive: z.number(),
    timeOut: z.number(),
  });
}
