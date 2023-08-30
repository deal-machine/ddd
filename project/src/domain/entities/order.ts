import { AttributeException, DomainException } from "../errors";
import { IOrder, OrderConstructor } from "../protocols";
import { OrderItem } from "./order-item";

export class Order implements IOrder {
  private id: string;
  private customerId: string;
  private items: OrderItem[];
  private total: number;

  constructor({ id, customerId, items }: OrderConstructor) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.total = this.sumTotal();

    this.validate();
  }

  private validate() {
    if (!this.id) throw new AttributeException("id is required");

    if (!this.customerId)
      throw new DomainException("Order must have a linked customerId");

    if (!this.items || this.items.length < 1)
      throw new DomainException("Order must include at least one OrderItem");
  }

  private sumTotal(): number {
    return this.items.reduce((acc, item) => acc + item.getPrice(), 0);
  }

  getTotal(): number {
    this.validate();
    return this.total;
  }

  getId(): string {
    this.validate();
    return this.id;
  }

  getCustomerId(): string {
    this.validate();
    return this.customerId;
  }

  getOrderItems(): OrderItem[] {
    this.validate();
    return this.items;
  }
}
