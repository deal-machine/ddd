import { AttributeException, DomainException } from "../../../@shared/errors";
import { Customer } from "../../customer/entities/customer";

import { Order } from "./order";
import { OrderItem } from "./order-item";

let customer: Customer;
let orderItem: OrderItem;
let orderItemTwo: OrderItem;

describe("Order Entity", () => {
  beforeAll(() => {
    customer = new Customer({
      id: "id-customer-test",
      name: "name-customer-test",
    });
    orderItem = new OrderItem({
      id: "id-orderitem-test",
      name: "name-orderitem-test",
      price: 51,
      productId: "product-id",
      quantity: 1,
    });
    orderItemTwo = new OrderItem({
      id: "id-orderitem-test-two",
      name: "name-orderitem-test-two",
      price: 15,
      productId: "product-id",
      quantity: 1,
    });
  });

  describe("constructor validate", () => {
    it("should throw AttributeException when id is empty", () => {
      try {
        new Order({
          id: "",
          customerId: customer.id,
          items: [orderItem, orderItemTwo],
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("id is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw DomainException when customerId is empty", () => {
      try {
        new Order({
          id: "id-order-test",
          customerId: "",
          items: [orderItem, orderItemTwo],
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toBe("Order must have a linked customerId");
        expect(error.name).toBe("DomainException");
      }
    });
    it("should throw DomainException when items is empty", () => {
      try {
        new Order({
          id: "id-order-test",
          customerId: customer.id,
          items: [],
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toBe("Order must include at least one OrderItem");
        expect(error.name).toBe("DomainException");
      }
    });
    it("should create new Order correctly", () => {
      const order = new Order({
        id: "id",
        customerId: customer.id,
        items: [orderItem, orderItemTwo],
      });
      expect(order).toBeTruthy();
      expect(order.id).toBe("id");
      expect(order.items).toStrictEqual([orderItem, orderItemTwo]);
      expect(order.total).toBe(66);
      expect(order.customerId).toBe(customer.id);
    });
  });
});
