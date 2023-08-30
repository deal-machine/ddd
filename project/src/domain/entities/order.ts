import { IOrder, OrderConstructor, OrderItemAttributes } from "../protocols";

export class Order implements IOrder {
  id: string;
  customerId: string;
  items: OrderItemAttributes[];

  constructor({ id, customerId, items }: OrderConstructor) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
  }

  total(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
