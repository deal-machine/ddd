import { AttributeException, DomainException } from "../../../@shared/errors";
import { IProduct, ProductConstructor } from "./product-protocol";

export class Product implements IProduct {
  private _id: string;
  private _name: string;
  private _description: string;
  private _category: string;
  private _price: number;

  constructor({ id, name, category, description, price }: ProductConstructor) {
    this.validate({ id, name, category, description, price });

    this._id = id;
    this._name = name;
    this._description = description;
    this._category = category;
    this._price = price;
  }

  private validate({
    id,
    name,
    category,
    description,
    price,
  }: ProductConstructor): void {
    if (!id) throw new AttributeException("id is required");
    if (!name) throw new AttributeException("name is required");
    if (!description) throw new AttributeException("description is required");
    if (!category) throw new AttributeException("category is required");
    if (!price) throw new AttributeException("price is required");
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

  get description(): string {
    return this._description;
  }

  get category(): string {
    return this._category;
  }

  get price(): number {
    return this._price;
  }
}
