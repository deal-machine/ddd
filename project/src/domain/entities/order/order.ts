import { AttributeException, DomainException } from "../../errors";
import { OrderItem } from "../order-item/order-item";
import { IOrder, OrderConstructor } from "./order.protocol";

export class Order implements IOrder {
  private id: string;
  private customerId: string;
  private items: OrderItem[];
  private total: number;

  constructor({ id, customerId, items }: OrderConstructor) {
    this.validate({ id, customerId, items });

    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.total = this.sumTotal();
  }

  private validate({ id, customerId, items }: OrderConstructor) {
    if (!id) throw new AttributeException("id is required");

    if (!customerId)
      throw new DomainException("Order must have a linked customerId");

    if (!items || items.length < 1)
      throw new DomainException("Order must include at least one OrderItem");
  }

  private sumTotal(): number {
    return this.items.reduce((acc, item) => acc + item.getPrice(), 0);
  }

  getTotal(): number {
    return this.total;
  }

  getId(): string {
    return this.id;
  }

  getCustomerId(): string {
    return this.customerId;
  }

  getOrderItems(): OrderItem[] {
    return this.items;
  }
}
