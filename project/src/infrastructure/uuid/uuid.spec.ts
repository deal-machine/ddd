import { IdentifierGeneratorAdapter } from "../../application/protocols";
import { Uuid } from "./uuid";

let adapter: IdentifierGeneratorAdapter;

describe("uuid Adapter", () => {
  beforeAll(() => {
    adapter = new Uuid();
  });

  describe("generate", () => {
    it("should generate a unique identifier", () => {
      const id = adapter.generate();
      expect(id).toBeTruthy();
      expect(typeof id).toBe("string");

      const idTwo = adapter.generate();
      expect(idTwo).toBeTruthy();
      expect(typeof idTwo).toBe("string");

      expect(id).not.toEqual(idTwo);
      expect(id == idTwo).toBeFalsy();
    });
  });
});
