import { StateCreator } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

export interface SQLEditorOption {
  name: string;
  fontSize?: number | string;
  showGutter?: boolean;
  tabSize?: number;
  placeholder?: string;
  lineHeight: number;
  showLineNumbers: boolean;
  mode: string;
}

interface SQLEditorOptionStore {
  option: SQLEditorOption;
  updateEditorOption: (value: Partial<SQLEditorOption>) => void;
}

const SQLEditorOptionStoreSlice: StateCreator<
  SQLEditorOptionStore,
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ]
> = (set) => ({
  option: {
    name: "ACE_EDITOR",
    lineHeight: 24,
    mode: "sql",
    fontSize: 18,
    showLineNumbers: true,
  },
  updateEditorOption: (value) =>
    set((state) => {
      state.option = { ...state.option, ...state };
    }),
});

export const useSQLEditorOptionStore =
  createWithEqualityFn<SQLEditorOptionStore>()(
    immer(
      devtools(
        subscribeWithSelector(
          persist(SQLEditorOptionStoreSlice, {
            name: "SQLEditorOptionStore",
            storage: createJSONStorage(() => localStorage),
          }),
        ),
      ),
    ),
  );
