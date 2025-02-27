import {
  Dict,
  DictPageSearchCondition,
  ObjectType,
  PageRequest,
  PageResult,
} from "@/models";
import instance from "@/lib/axios";
export const queryPageDict = (
  body: PageRequest<DictPageSearchCondition>,
): Promise<PageResult<Dict>> => {
  return instance.post<PageRequest<string>, PageResult<Dict>>(
    "/dict/page",
    body,
  );
};

export const dictNumbers = (
  dataSourceId: number,
  objectTypes: ObjectType[],
): Promise<number[]> => {
  return instance.post("/dict/dictNumbers", {
    dataSourceId: dataSourceId,
    objectTypes: objectTypes,
  });
};
