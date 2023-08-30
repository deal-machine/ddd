import { AttributeException, DomainException } from "../errors";
import { IOrderItem, OrderItemConstructor } from "../protocols";

export class OrderItem implements IOrderItem {
  private id: string;
  private name: string;
  private price: number;

  constructor({ id, name, price }: OrderItemConstructor) {
    this.id = id;
    this.name = name;
    this.price = price;

    this.validate();
  }

  private validate() {
    if (!this.id) throw new AttributeException("id is required");

    if (!this.name) throw new AttributeException("name is required");

    if (!this.price) throw new AttributeException("price is required");
  }

  increaseValue(value: number): number {
    this.validate();

    if (value < 1) throw new DomainException("value should be positive");
    this.price += value;
    return this.price;
  }

  getPrice(): number {
    this.validate();
    return this.price;
  }

  toString(): string {
    return `id: ${this.id}, name: ${this.name}, price: ${this.price}`;
  }
}
