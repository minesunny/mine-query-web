import * as z from "zod";

export const PageResultSchema = <T extends z.ZodTypeAny>(contentSchema: T) =>
  z.object({
    content: z.array(contentSchema),
    number: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
  });

export type PageResult<T> = {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: T[];
};
