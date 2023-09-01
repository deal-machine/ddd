import { AttributeException, DomainException } from "../../errors";
import { IOrderItem, OrderItemConstructor } from "./order-item-protocol";

export class OrderItem implements IOrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity: number;

  constructor({ id, name, price, productId, quantity }: OrderItemConstructor) {
    this.validate({ id, name, price, productId, quantity });

    this._id = id;
    this._name = name;
    this._price = price * quantity;
    this._productId = productId;
    this._quantity = quantity;
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

    this._price += value;
    return this._price;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  /*
  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }
  */
}
