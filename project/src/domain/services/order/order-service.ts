import { Order } from "../../entities";
import { DomainException } from "../../errors";
import { PlaceOrderParams, TotalParams } from "./order-service-protocol";

export class OrderService {
  static placeOrder({ customer, orderItems }: PlaceOrderParams): Order {
    if (orderItems.length < 1)
      throw new DomainException("Order must include at least one OrderItem");

    const order = new Order({
      id: "order-id",
      customerId: customer.id,
      items: orderItems,
    });

    const rewardPoints = order.total / 2;
    customer.increaseRewardPoints(rewardPoints);

    return order;
  }

  static total({ orders }: TotalParams): number {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }
}
