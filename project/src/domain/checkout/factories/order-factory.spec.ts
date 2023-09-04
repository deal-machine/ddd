import { OrderFactory } from "./order-factory";

describe("Order Factory", () => {
  it("should create order", () => {
    const order = OrderFactory.create({
      customerId: "customer-id",
      items: [{ name: "name", price: 20, productId: "12", quantity: 2 }],
    });
    expect(order).toBeTruthy();
  });
});
