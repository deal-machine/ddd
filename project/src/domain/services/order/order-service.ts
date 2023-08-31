import { Order } from "../../entities";

export class OrderService {
  static total({ orders }: { orders: Order[] }): number {
    return orders.reduce((acc, order) => acc + order.getTotal(), 0);
  }
}
