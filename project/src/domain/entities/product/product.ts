import { AttributeException, DomainException } from "../../errors";
import { IProduct, ProductConstructor } from "./product-protocol";

export class Product implements IProduct {
  private id: string;
  private name: string;
  private description: string;
  private category: string;
  private price: number;

  constructor({ id, name, category, description, price }: ProductConstructor) {
    this.validate({ id, name, category, description, price });

    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
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
    this.price += value;
    return this.price;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getCategory(): string {
    return this.category;
  }

  getPrice(): number {
    return this.price;
  }
}
