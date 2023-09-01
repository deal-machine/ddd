import { initDatabase } from "./infrastructure/database";

(async () => {
  const seq = await initDatabase();
  console.log(`\nConnected on ${seq.getDatabaseName()}\n`);
})();
