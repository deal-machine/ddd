import { DomainException } from "../errors";
import { IOrderItem, OrderItemConstructor } from "../protocols";

export class OrderItem implements IOrderItem {
  id: string;
  name: string;
  price: number;

  constructor({ id, name, price }: OrderItemConstructor) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  increaseValue(value: number): number {
    if (value < 0) throw new DomainException("value should be positive");
    return this.price + value;
  }

  toString(): string {
    return `id: ${this.id}, name: ${this.name}, price: ${this.price}`;
  }
}
