import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";
import { ExecuteContext } from "@/models/execute";
import { DataSourceType, ObjectType } from "@/models";
// submit a task to execute SQL;
type ExecuteEvent = {
  executeId: string;
  executeContext: ExecuteContext;
};
type Event = {
  execute: ExecuteEvent;
};

type EventStore = {
  event: Event;
  publishEvent: (event: Partial<Event>) => void;
};

const useEventStore = createStore<EventStore>()(
  subscribeWithSelector((set) => ({
    event: {
      execute: {
        executeId: "",
        executeContext: {
          dataSourceType: DataSourceType.SQLite,
          dataBaseName: "main",
          schemaName: "main",
          objectName: "main",
          objectType: ObjectType.TABLE,
          editorId: "string",
          query: "select * from a",
          dataSourceId: "string",
          limit: 100,
          offset: 0,
          statement: {
            statement: "select * from a",
          },
        },
      },
    },
    publishEvent: (value) => {
      console.log(value);
      return set((state) => ({
        event: {
          ...state.event,
          ...value,
        },
      }));
    },
  })),
);

type EventHandler<T = any> = (data: T) => void;

const event = {
  subscribe<E extends keyof Event>(
    event: E,
    handler: EventHandler<Event[E]>,
  ): () => void {
    switch (event) {
      case "execute":
        return useEventStore.subscribe(
          (state) => state.event.execute as Event[E],
          handler,
        );
    }
    return () => {};
  },
  publish<E extends keyof Event>(event: E, data: Event[E]): void {
    switch (event) {
      case "execute":
        useEventStore.getState().publishEvent({
          execute: data as ExecuteEvent,
        });
        break;
    }
  },
};

export { event };
export type { ExecuteEvent };
