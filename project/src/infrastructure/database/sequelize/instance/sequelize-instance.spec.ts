import { initDatabase, closeDatabase, getInstance } from "..";
import { DatabaseException } from "../../errors/database.error";

describe("Sequelize Instance", () => {
  describe("initDatabase", () => {
    it("should initSequelize correctly", async () => {
      const sequelize = await initDatabase();
      expect(sequelize).toBeTruthy();
      expect(sequelize.models).toBeTruthy();
    });
  });
  describe("closeDatabase", () => {
    it("should closeDatabase and set sequelize to null", async () => {
      try {
        await closeDatabase();
        await closeDatabase();
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(DatabaseException);
        expect(error.message).toBe("Sequelize connection not exists.");
      }
      expect(() => getInstance()).toThrowError(DatabaseException);
      expect(() => getInstance()).toThrowError(
        "Sequelize connection not exists."
      );
    });
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
  describe("getInstance", () => {
    it("should getInstance correctly", async () => {
      const sequelize = await initDatabase();
      expect(sequelize).toBeTruthy();
      const seqInstance = getInstance();
      expect(seqInstance).toBeTruthy();

      expect(sequelize).toStrictEqual(seqInstance);
    });
    it("should throws DatabaseException when databaseInstance not exists", async () => {
      try {
        await closeDatabase();
        getInstance();
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(DatabaseException);
        expect(error.message).toBe("Sequelize connection not exists.");
      }
    });
  });
});
