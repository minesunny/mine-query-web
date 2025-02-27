import * as z from "zod";
export const PageRequestSchema = <T extends z.ZodTypeAny>(
  searchConditionSchema: T,
) =>
  z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    searchCondition: searchConditionSchema, // 使用传入的搜索条件验证器
  });
// export type PageRequest<T> = z.infer<
//   ReturnType<typeof PageRequestSchema<z.ZodType<T>>>
// >;

export type PageRequest<T> = {
  pageNumber: number;
  pageSize: number;
  searchCondition?: T | undefined | null;
};
