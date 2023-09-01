import { initDatabase, closeDatabase } from "..";
import { DatabaseException } from "../../errors/database.error";

describe("sequelize-connection", () => {
  describe("initDatabase", () => {
    it("should initSequelize correctly", async () => {
      const sequelize = await initDatabase();
      expect(sequelize).toBeTruthy();
      expect(sequelize.models).toBeTruthy();
    });
  });
  describe("closeDatabase", () => {
    it("should throws DatabaseException when databaseInstance not exists", async () => {
      try {
        await closeDatabase();
        await closeDatabase();
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(DatabaseException);
        expect(error.message).toBe("Sequelize connection not exists.");
      }
    });
  });
});
