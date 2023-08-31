import { Product } from "../../entities";
import { ProductService } from "./product-service";

describe("Product Service", () => {
  describe("increaseValue", () => {
    it("should increase value of all products", () => {
      const productOne = new Product({
        id: "id",
        name: "name",
        category: "category",
        description: "description",
        price: 1,
      });
      const productTwo = new Product({
        id: "id",
        name: "name",
        category: "category",
        description: "description",
        price: 2,
      });

      const products = [productOne, productTwo];
      ProductService.increaseValue({ products, value: 10 });

      expect(productOne.getPrice()).toBe(11);
      expect(productTwo.getPrice()).toBe(12);
    });
  });
});
