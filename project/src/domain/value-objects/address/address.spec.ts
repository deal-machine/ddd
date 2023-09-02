import { AttributeException } from "../../errors";
import { Address } from "./address";

describe("Address ValueObject", () => {
  describe("constructor validate", () => {
    it("should throw AttribueValidate when zipcode is empty", () => {
      try {
        new Address({
          city: "city-test",
          country: "country-test",
          number: "number-test",
          street: "street-test",
          zipcode: "",
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("zipcode is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttribueValidate when number is empty", () => {
      try {
        new Address({
          city: "city-test",
          country: "country-test",
          number: "",
          street: "street-test",
          zipcode: "zipcode-test",
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("number is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttribueValidate when street is empty", () => {
      try {
        new Address({
          city: "city-test",
          country: "country-test",
          number: "number-test",
          street: "",
          zipcode: "zipcode-test",
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("street is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttribueValidate when country is empty", () => {
      try {
        new Address({
          city: "city-test",
          country: "",
          number: "number-test",
          street: "street-test",
          zipcode: "zipcode-test",
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("country is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttribueValidate when city is empty", () => {
      try {
        new Address({
          city: "",
          country: "country-test",
          number: "number-test",
          street: "street-test",
          zipcode: "zipcode-test",
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("city is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should create new Address correctly", () => {
      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      expect(address).toBeTruthy();
      expect(address).toHaveProperty("city");
      expect(address).toHaveProperty("country");
      expect(address).toHaveProperty("number");
      expect(address).toHaveProperty("street");
      expect(address).toHaveProperty("zipcode");
    });
  });
});
