import { closeDatabase } from "../../../infrastructure/database";

export default async () => {
  console.log("\n closing...");
  await closeDatabase();
  console.log("...closed \n");
};
