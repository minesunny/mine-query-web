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
}

interface SQLEditorEnvStore {
  editors: SQLEditorEnv[];
  activeId: string;
  setActive: (item: SQLEditorEnv | string) => void;
  addEditor: (item: SQLEditorEnv) => void;
  removeEditor: (editId: string) => void;
  updateEditor: (editorId: string, updatedItem: Partial<SQLEditorEnv>) => void;
}

const SQLEditorEnvStoreSlice: StateCreator<
  SQLEditorEnvStore,
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ]
> = (set) => ({
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
      state.editors = state.editors.filter(
        (item) => item.editorId !== editorId,
      );
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
};
