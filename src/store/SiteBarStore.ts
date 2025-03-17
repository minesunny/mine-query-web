import { StateCreator } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { LineSplit, Encoding } from "@/models/const";
export interface SiteBarOption {
  dataSourceTree?: boolean;
  editorPath?: string;
  editorPosition: string;
  editorLineSplit: (typeof LineSplit)[number];
  encoding: (typeof Encoding)[number];
  space: number;
}

interface SiteBarStore {
  siteBarOption: SiteBarOption;
  updateSiteBarOption: (value: Partial<SiteBarOption>) => void;
}

const SiteBarStoreSlice: StateCreator<
  SiteBarStore,
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ]
> = (set) => ({
  siteBarOption: {
    editorPosition: "",
    editorLineSplit: "CRLF",
    encoding: "UTF8",
    space: 4,
  },

  updateSiteBarOption: (value) =>
    set((state) => {
      state.siteBarOption = {
        ...state.siteBarOption,
        ...value,
      };
    }),
});

export const useSiteBarStore = createWithEqualityFn<SiteBarStore>()(
  immer(
    devtools(
      subscribeWithSelector(
        persist(SiteBarStoreSlice, {
          name: "SiteBarStore",
          storage: createJSONStorage(() => localStorage),
        }),
      ),
    ),
  ),
);
