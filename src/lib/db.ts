// db.js
import Dexie from "dexie";

export const db = new Dexie("myDatabase");
// db.version(1).stores({
//   values: "++id, name, age" // Primary key and indexed props
// });