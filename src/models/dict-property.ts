import { z } from "zod";

export type DictProperty = {
  dictValue: string;
  dictValueClass: string;
  id: number;
};

export const DictPropertySchema = z.object({
  dictValue: z.string(),
  dictValueClass: z.string(),
  id: z.number(),
});
