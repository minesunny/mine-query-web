import instance from "@/lib/axios";
import { ExecuteContext, ExecuteResult } from "@/models/execute";
import { useQuery } from "@tanstack/react-query";

// const executeStatement = (body: ExecuteContext): Promise<ExecuteResult> => {
//   return instance.post<ExecuteContext, ExecuteResult>("/execute", body);
// };
const executeStatement = (body: ExecuteContext): Promise<ExecuteResult> => {
  return new Promise((resolve) => {
    const result: ExecuteResult = {
      executeContext: body,
      items: [
        {
          statement: body.statement,
          columns: [
            {
              name: "name1",
              type: "string",
            },
            {
              name: "name2",
              type: "string",
            },
            {
              name: "name3",
              type: "string",
            },
          ],
          values: [
            [
              {
                name: "name1",
                type: "string",
                value: "raw1 value1",
              },
              {
                name: "name2",
                type: "string",
                value: "raw1 value2",
              },
              {
                name: "name3",
                type: "string",
                value: "raw1 value3",
              },
            ],
            [
              {
                name: "name1",
                type: "string",
                value: "raw2 value1",
              },
              {
                name: "name2",
                type: "string",
                value: "raw2 value2",
              },
              {
                name: "name3",
                type: "string",
                value: "raw2 value3",
              },
            ],
          ],
        },
      ],
    };
    resolve(result);
  });
};
const executeStatementSync = (body: ExecuteContext): Promise<boolean> => {
  return instance.post<ExecuteContext, boolean>("/execute", body);
};
export const executeApi = {
  executeStatement,
  executeStatementSync,
};
const useExecuteStatement = (context: ExecuteContext) => {
  return useQuery({
    queryKey: ["execute", context],
    queryFn: () => executeStatement(context),
  });
};

export const useExecuteApi = {
  useExecuteStatement: useExecuteStatement,
};
