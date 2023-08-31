import { Order } from "../../entities";
import { DomainException } from "../../errors";
import { PlaceOrderParams, TotalParams } from "./order-service-protocol";

export class OrderService {
  static placeOrder({ customer, orderItems }: PlaceOrderParams): Order {
    if (orderItems.length < 1)
      throw new DomainException("Order must include at least one OrderItem");

    const order = new Order({
      id: "order-id",
      customerId: customer.getId(),
      items: orderItems,
    });

    const rewardPoints = order.getTotal() / 2;
    customer.increaseRewardPoints(rewardPoints);

    return order;
  }

  static total({ orders }: TotalParams): number {
    return orders.reduce((acc, order) => acc + order.getTotal(), 0);
  }
}
