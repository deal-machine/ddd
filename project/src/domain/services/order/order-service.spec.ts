import { Customer, Order, OrderItem, Product } from "../../entities";
import { OrderService } from "./order-service";

describe("Order Service", () => {
  describe("total", () => {
    it("should return total of order price", () => {
      //Arrange
      const customer = new Customer({
        id: "customer-id",
        name: "customer-name",
      });
      const product = new Product({
        id: "product-id",
        name: "product-name",
        category: "product-category",
        description: "product-description",
        price: 50,
      });
      const orderItem = new OrderItem({
        id: "1234",
        name: "Item example one",
        price: 12,
        productId: product.getId(),
        quantity: 2,
      });
      const orderItemTwo = new OrderItem({
        id: "122",
        name: "second item example",
        price: 1,
        productId: product.getId(),
        quantity: 6,
      });
      const orderItemThree = new OrderItem({
        id: "122",
        name: "second item example",
        price: 100,
        productId: product.getId(),
        quantity: 6,
      });
      const order = new Order({
        customerId: customer.getId(),
        id: "order-id-one",
        items: [orderItem, orderItemTwo],
      });
      const orderTwo = new Order({
        customerId: customer.getId(),
        id: "order-id-two",
        items: [orderItem],
      });
      const orderThree = new Order({
        customerId: customer.getId(),
        id: "order-id-three",
        items: [orderItemTwo],
      });
      const orderFour = new Order({
        customerId: customer.getId(),
        id: "order-id-three",
        items: [orderItemThree],
      });

      //Act
      const totalValue = OrderService.total({
        orders: [order, orderTwo, orderThree, orderFour],
      });

      // Assert
      expect(totalValue).toBeTruthy();
      expect(totalValue).toBe(660);
    });
  });
});
