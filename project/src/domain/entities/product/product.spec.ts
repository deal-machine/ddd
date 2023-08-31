import { AttributeException } from "../../errors";
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
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("category is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should create new Product correctly", () => {
      const product = new Product({
        id: "id-test",
        name: "name-test",
        description: "description-test",
        category: "category-test",
      });
      expect(product).toBeTruthy();
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("category");
    });
  });
  describe("getId", () => {
    it("should return product id", () => {
      const product = new Product({
        id: "id-product-test",
        name: "name-product-test",
        description: "description-product-test",
        category: "category-product-test",
      });
      expect(product.getId()).toBeTruthy();
      expect(product.getId()).toBe("id-product-test");
    });
  });
  describe("getName", () => {
    it("should return product name", () => {
      const product = new Product({
        id: "id-product-test",
        name: "name-product-test",
        description: "description-product-test",
        category: "category-product-test",
      });
      expect(product.getName()).toBeTruthy();
      expect(product.getName()).toBe("name-product-test");
    });
  });
  describe("getDescription", () => {
    it("should return product description", () => {
      const product = new Product({
        id: "id-product-test",
        name: "name-product-test",
        description: "description-product-test",
        category: "category-product-test",
      });
      expect(product.getDescription()).toBeTruthy();
      expect(product.getDescription()).toBe("description-product-test");
    });
  });
  describe("getCategory", () => {
    it("should return product category", () => {
      const product = new Product({
        id: "id-product-test",
        name: "name-product-test",
        description: "description-product-test",
        category: "category-product-test",
      });
      expect(product.getCategory()).toBeTruthy();
      expect(product.getCategory()).toBe("category-product-test");
    });
  });
});
