import { AttributeException, DomainException } from "../../../@shared/errors";
import { Product } from "./product";

describe("Product Entity", () => {
  describe("constructor validate", () => {
    it("should throw AttributeException when id is empty", () => {
      try {
        new Product({
          id: "",
          name: "name-product-test",
          description: "description-product-test",
          category: "category-product-test",
          price: 5,
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("id is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttributeException when name is empty", () => {
      try {
        new Product({
          id: "id-product-test",
          name: "",
          description: "description-product-test",
          category: "category-product-test",
          price: 5,
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("name is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttributeException when description is empty", () => {
      try {
        new Product({
          id: "id-product-test",
          name: "name-product-test",
          description: "",
          category: "category-product-test",
          price: 5,
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("description is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttributeException when category is empty", () => {
      try {
        new Product({
          id: "id-product-test",
          name: "name-product-test",
          description: "description-product-test",
          category: "",
          price: 5,
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("category is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttributeException when price is empty", () => {
      try {
        new Product({
          id: "id-product-test",
          name: "name-product-test",
          description: "description-product-test",
          category: "category-product-test",
          price: 0,
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("price is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should create new Product correctly", () => {
      const product = new Product({
        id: "id-test",
        name: "name-test",
        description: "description-test",
        category: "category-test",
        price: 5,
      });
      expect(product).toBeTruthy();
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("category");
    });
  });
  describe("increaseValue", () => {
    it("should throw DomainException when value is less than 0", () => {
      const product = new Product({
        id: "id-test",
        name: "name-test",
        description: "description-test",
        category: "category-test",
        price: 5,
      });
      expect(() => product.increaseValue(-1)).toThrowError(DomainException);
      expect(() => product.increaseValue(0)).toThrowError(
        "value should be positive"
      );
    });
    it("should return price added value", () => {
      const product = new Product({
        id: "id-test",
        name: "name-test",
        description: "description-test",
        category: "category-test",
        price: 5,
      });
      product.increaseValue(50);
      expect(product.price).toBe(55);
    });
  });
});
