import { AttributeException } from "../../errors";
import { IProduct, ProductConstructor } from "./product.protocol";

export class Product implements IProduct {
  private id: string;
  private name: string;
  private description: string;
  private category: string;

  constructor({ id, name, category, description }: ProductConstructor) {
    this.validate({ id, name, category, description });

    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
  }

  private validate({
    id,
    name,
    category,
    description,
  }: ProductConstructor): void {
    if (!id) throw new AttributeException("id is required");
    if (!name) throw new AttributeException("name is required");
    if (!description) throw new AttributeException("description is required");
    if (!category) throw new AttributeException("category is required");
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
}
