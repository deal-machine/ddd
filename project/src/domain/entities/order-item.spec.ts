import { AttributeException, DomainException } from "../errors";
import { OrderItem } from "./order-item";

describe("OrderItem Entity", () => {
  describe("constructor validate", () => {
    it("should throw AttributeException when id is empty", () => {
      try {
        new OrderItem({
          id: "",
          name: "Tester",
          price: 50,
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
        new OrderItem({
          id: "id-testing",
          name: "",
          price: 5,
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("name is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttributeException when price is empty", () => {
      try {
        new OrderItem({
          id: "id-testing",
          name: "name-testing",
          price: 0,
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("price is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should create new OrderItem correctly", () => {
      const orderItem = new OrderItem({
        id: "id-test",
        name: "name-test",
        price: 11,
      });
      expect(orderItem).toBeTruthy();
      expect(orderItem).toHaveProperty("id");
      expect(orderItem).toHaveProperty("name");
      expect(orderItem).toHaveProperty("price");
    });
  });
  describe("increaseValue", () => {
    it("should throw DomainException when value is less than 0", () => {
      const orderItem = new OrderItem({
        id: "id-tester",
        name: "tester",
        price: 50,
      });
      expect(() => orderItem.increaseValue(-1)).toThrowError(DomainException);
      expect(() => orderItem.increaseValue(0)).toThrowError(
        "value should be positive"
      );
    });
    it("should return price added value", () => {
      const orderItem = new OrderItem({
        id: "id-tester",
        name: "tester",
        price: 50,
      });
      orderItem.increaseValue(50);
      expect(orderItem.getPrice()).toBe(100);
    });
  });
  describe("getPrice", () => {
    it("should return price", () => {
      const orderItem = new OrderItem({
        id: "id-tester",
        name: "tester",
        price: 123,
      });
      expect(orderItem.getPrice()).toBe(123);
    });
  });
  describe("toString", () => {
    it("should return entity in string format", () => {
      const orderItem = new OrderItem({
        id: "id-tester",
        name: "tester",
        price: 1,
      });
      expect(orderItem.toString()).toBe(
        "id: id-tester, name: tester, price: 1"
      );
    });
  });
});
