import { AttributeException, DomainException } from "../../errors";
import { IOrderItem, OrderItemConstructor } from "./order-item-protocol";

export class OrderItem implements IOrderItem {
  private id: string;
  private name: string;
  private price: number;
  private productId: string;
  private quantity: number;

  constructor({ id, name, price, productId, quantity }: OrderItemConstructor) {
    this.validate({ id, name, price, productId, quantity });

    this.id = id;
    this.name = name;
    this.price = price * quantity;
    this.productId = productId;
    this.quantity = quantity;
  }

  private validate({
    id,
    name,
    price,
    productId,
    quantity,
  }: OrderItemConstructor) {
    if (!id) throw new AttributeException("id is required");

    if (!name) throw new AttributeException("name is required");

    if (!price) throw new AttributeException("price is required");

    if (!productId)
      throw new DomainException("OrderItem must have relation with a product");

    if (!quantity || quantity < 1)
      throw new DomainException("Quantity must be greater than 0");
  }

  increaseValue(value: number): number {
    if (value < 1) throw new DomainException("value should be positive");
    this.price += value;
    return this.price;
  }

  getPrice(): number {
    return this.price;
  }

  getProductId(): string {
    return this.productId;
  }

  getQuantity(): number {
    return this.quantity;
  }
}
