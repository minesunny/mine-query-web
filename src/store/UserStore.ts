import { StateCreator } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { immer } from "zustand/middleware/immer";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { DataSourceType } from "@/models";

interface UserStore {
  name: string;
  avatar: string;
  email: string;
}

/**
 * immer(devtools(subscribeWithSelector(persist()))
 */
const userStoreSlice: StateCreator<
  UserStore,
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown],
  ]
> = (set, get) => ({
  name: "Jane Doe",
  avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  email: "thirteenthree@outlook.com",
});
export const useUserStore = createSelectorHooks(
  createWithEqualityFn<UserStore>()(
    immer(
      devtools(
        subscribeWithSelector(
          persist(userStoreSlice, {
            name: "bearStore",
            storage: createJSONStorage(() => localStorage),
            // partialize: (state) => ({ bears: state.bears }),
            partialize: (state) =>
              Object.fromEntries(
                Object.entries(state).filter(
                  ([key]) => !["size"].includes(key),
                ),
              ),
          }),
        ),
      ),
    ),
  ),
);
