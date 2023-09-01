import { AttributeException, DomainException } from "../../errors";
import { OrderItem } from "../order-item/order-item";
import { IOrder, OrderConstructor } from "./order-protocol";

export class Order implements IOrder {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor({ id, customerId, items }: OrderConstructor) {
    this.validate({ id, customerId, items });

    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.sumTotal();
  }

  private validate({ id, customerId, items }: OrderConstructor) {
    if (!id) throw new AttributeException("id is required");

    if (!customerId)
      throw new DomainException("Order must have a linked customerId");

    if (!items || items.length < 1)
      throw new DomainException("Order must include at least one OrderItem");
  }

  private sumTotal(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }

  get total(): number {
    return this._total;
  }

  get id(): string {
    return this._id;
  }
  /*
  get customerId(): string {
    return this._customerId;
  }

  get orderItems(): OrderItem[] {
    return this._items;
  }
  */
}
