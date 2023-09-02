import { initDatabase } from "./infrastructure/database/sequelize";

(async () => {
  const seq = await initDatabase();
  console.log(`\nConnected on ${seq.getDatabaseName()}\n`);
})();
