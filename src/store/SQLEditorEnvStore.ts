import { DataSourceType } from "@/models";
import { StateCreator } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

export interface SQLEditorEnv {
  dataSourceType: DataSourceType;
  dataSourceId: string | number;
  dataBaseName: string;
  schemaName: string;
  running: boolean;
  editorId: string;
  code: string;
  name: string;
  cursor?: {
    row: number;
    column: number;
  };
  path?: string; // datasourceName-databaseName-schemaName-
  executing?: boolean;
  dataIds?: string[];
}

interface SQLEditorEnvStore {
  editors: SQLEditorEnv[];
  activeId: string;
  setActive: (item: SQLEditorEnv | string) => void;
  addEditor: (item: SQLEditorEnv) => void;
  removeEditor: (editorId: string | string[]) => void;
  updateEditor: (editorId: string, updatedItem: Partial<SQLEditorEnv>) => void;
  getEditor: (editorId: string) => SQLEditorEnv | undefined;
}

const SQLEditorEnvStoreSlice: StateCreator<
  SQLEditorEnvStore,
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ]
> = (set, get) => ({
  editors: [],
  activeId: "",
  setActive: (item) =>
    set((state) => {
      const editorId = typeof item === "string" ? item : item.editorId;
      const find = state.editors.find((editor) => editor.editorId == editorId);
      if (find) {
        state.activeId = editorId;
      }
    }),
  addEditor: (item) =>
    set((state) => {
      state.editors.push(item);
    }),
  removeEditor: (editorId) =>
    set((state) => {
      if (typeof editorId === "string") {
        state.editors = state.editors.filter(
          (item) => item.editorId !== editorId,
        );
      } else if (editorId != undefined) {
        const editorIds = editorId as string[];
        state.editors = state.editors.filter(
          (item) => !editorIds.includes(item.editorId),
        );
      }
    }),
  updateEditor: (editorId, updatedItem) =>
    set((state) => {
      const index = state.editors.findIndex(
        (item) => item.editorId === editorId,
      );
      if (index !== -1) {
        state.editors[index] = { ...state.editors[index], ...updatedItem };
      }
    }),
  getEditor: (editorId) => {
    return get().editors.find((editor) => editor.editorId == editorId);
  },
});

export const useSQLEditorEnvStore = createWithEqualityFn<SQLEditorEnvStore>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(SQLEditorEnvStoreSlice, {
          name: "SQLEditorEnvStore",
          storage: createJSONStorage(() => localStorage),
        }),
      ),
    ),
  ),
);

export const defaultSQLEditEnv: SQLEditorEnv = {
  dataSourceId: "",
  dataBaseName: "",
  schemaName: "",
  running: false,
  editorId: "defaultId",
  code: "",
  dataSourceType: DataSourceType.SQLite,
  name: "defaultName",
  executing: false,
};
