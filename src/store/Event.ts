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
        }
      },
    },
    publishEvent: (value) =>
      set((state) => ({
        event: {
          ...state.event,
          ...value,
        },
      })),
  }))
);
type EventMap = {
  execute: ExecuteEvent;

};
type EventType = "execute";

type EventHandler<T = any> = (data: T) => void;

const event = {

  subscribe<E extends keyof EventMap>(event: E, handler: EventHandler<EventMap[E]>): () => void {
    switch (event) {
      case "execute":
        return useEventStore.subscribe((state) => state.event.execute as EventMap[E], handler);
    }
  },
  publish<E extends keyof EventMap>(event: E, data: EventMap[E]): void {
    switch (event) {
      case "execute":
        useEventStore.getState().publishEvent({
          execute: data,
        });
        break;
    }
  },
};

export { event };
export type {
  EventType,
  ExecuteEvent,
};