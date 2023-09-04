import { Product } from "../../../domain/product/entities/product";
import { ProductRepository } from "../../../domain/product/repositories/product-repository-protocol";
import { ProductModel } from "./product-model";

export class SequelizeProductRepository implements ProductRepository {
  private readonly model;

  constructor() {
    this.model = ProductModel;
  }

  async findOne(id: string): Promise<Product | null> {
    const productModel = await this.model.findByPk(id);

    if (!productModel) return null;

    return new Product({
      id: String(productModel?.id),
      name: String(productModel?.name),
      description: String(productModel?.description),
      category: String(productModel?.category),
      price: Number(String(productModel?.price)),
    });
  }

  async findAll(): Promise<Product[]> {
    const productsModel = await this.model.findAll();

    if (productsModel.length < 1) return [];

    return productsModel.map(
      (pm) =>
        new Product({
          id: pm.id,
          name: pm.name,
          description: pm.description,
          category: pm.category,
          price: Number(pm.price),
        })
    );
  }

  async findAllByCategory(category: string): Promise<Product[]> {
    const productsModel = await this.model.findAll({
      where: { category },
    });

    if (productsModel.length < 1) return [];

    return productsModel.map(
      (pm) =>
        new Product({
          id: pm.id,
          category: pm.category,
          description: pm.description,
          name: pm.name,
          price: Number(pm.price),
        })
    );
  }

  async create(entity: Product): Promise<void> {
    await this.model.create({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      category: entity.category,
      price: entity.price,
    });
  }

  async update(
    id: string,
    { name, category, description, price }: Partial<Product>
  ): Promise<void> {
    await this.model.update(
      { name, category, description, price },
      { where: { id } }
    );
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
