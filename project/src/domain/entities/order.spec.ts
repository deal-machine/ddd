import { AttributeException, DomainException } from "../errors";
import { ICustomer } from "../protocols";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

let customer: ICustomer;
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
    });
    orderItemTwo = new OrderItem({
      id: "id-orderitem-test-two",
      name: "name-orderitem-test-two",
      price: 15,
    });
  });

  describe("constructor validate", () => {
    it("should throw AttributeException when id is empty", () => {
      try {
        new Order({
          id: "",
          customerId: customer.getId(),
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
          customerId: customer.getId(),
          items: [],
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toBe("Order must include at least one OrderItem");
        expect(error.name).toBe("DomainException");
      }
    });
  });
  describe("getTotal", () => {
    it("should return total value", () => {
      const order = new Order({
        id: "id-order-test",
        customerId: customer.getId(),
        items: [orderItem, orderItemTwo],
      });
      expect(order.getTotal()).toBe(66);
    });
  });

  describe("getId", () => {
    it("should return id value", () => {
      const order = new Order({
        id: "id-order-test",
        customerId: customer.getId(),
        items: [orderItem],
      });
      expect(order.getId()).toBe("id-order-test");
    });
  });

  describe("getCustomerId", () => {
    it("should return customerId value", () => {
      const customerId = customer.getId();
      const order = new Order({
        id: "id-order-test",
        customerId,
        items: [orderItemTwo],
      });
      expect(order.getCustomerId()).toBe(customerId);
    });
  });

  describe("getOrderItems", () => {
    it("should return items", () => {
      const orderItems = [orderItemTwo, orderItem];
      const order = new Order({
        id: "id-order-test",
        customerId: customer.getId(),
        items: orderItems,
      });
      expect(order.getOrderItems()).toBe(orderItems);
    });
  });
});