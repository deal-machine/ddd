import { initDatabase } from "../../../infrastructure/database";

export default async () => {
  console.log("\n starting...");
  await initDatabase();
  console.log("...started \n");
};
