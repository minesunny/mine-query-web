import { DictProperty, DictPropertySchema } from "@/models/dict-property";
import { z } from "zod";
import { ObjectType, ObjectTypeTypeSchema } from "@/models/object-type";

export type Dict = {
  dataSourceId: number;
  dictLevel: number;
  dictName: string;
  dictProperty: DictProperty | null;
  dictType: ObjectType;
  id: number;
  levelFour: string;
  levelOne: string;
  levelThree: string;
  levelTwo: string;
};
export enum GroupType {
  "TABLE" = "TABLE",
}

export const DictSchema = z.object({
  dataSourceId: z.number(),
  dictLevel: z.number(),
  dictName: z.string(),
  dictProperty: z.union([DictPropertySchema, z.null()]),
  dictType: ObjectTypeTypeSchema,
  id: z.number(),
  levelFour: z.string(),
  levelOne: z.string(),
  levelThree: z.string(),
  levelTwo: z.string(),
});
export type DictPageSearchCondition = {
  dictId: number | null;
  dictType: ObjectType | null;
};
export const DictPageSearchConditionSchema = z.object({
  dictId: z.number(),
  dictType: ObjectTypeTypeSchema,
});
