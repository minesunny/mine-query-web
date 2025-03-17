import { StateCreator } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
export interface Env {
  // using dataSourceTree
  collapsible: boolean;
  defaultSize: number;
  editorHeight: number;
}

interface EnvStore {
  env: Env;
  setCollapsible: (collapsible: boolean) => void;
  setDefaultSize: (defaultSize: number) => void;
  setEditorHeight: (height: number) => void;
}

const EnvStoreSlice: StateCreator<
  EnvStore,
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ]
> = (set) => ({
  env: {
    collapsible: false,
    defaultSize: 10,
    editorHeight: -1,
  },
  setCollapsible: (value) =>
    set((state) => {
      state.env.collapsible = value;
    }),
  setDefaultSize: (value) =>
    set((state) => {
      state.env.defaultSize = value;
    }),
  setEditorHeight: (value) =>
    set((state) => {
      state.env.editorHeight = value;
    }),
});

export const useEnvStoreStore = createWithEqualityFn<EnvStore>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(EnvStoreSlice, {
          name: "EnvStore",
          storage: createJSONStorage(() => localStorage),
        }),
      ),
    ),
  ),
);
