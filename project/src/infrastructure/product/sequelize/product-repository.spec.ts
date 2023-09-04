import { Product } from "../../../domain/product/entities/product";
import { ProductRepository } from "../../../domain/product/repositories/product-repository-protocol";
import { closeDatabase, initDatabase } from "../../@shared/database/sequelize";
import { SequelizeProductRepository } from "./product-repository";

let repository: ProductRepository;

describe("Sequelize Product Repository", () => {
  beforeEach(async () => {
    await initDatabase();
    repository = new SequelizeProductRepository();
  });
  afterEach(async () => closeDatabase());

  describe("findOne", () => {
    it("should find one by id", async () => {
      const productEntity = new Product({
        id: "1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });

      await repository.create(productEntity);

      const product = await repository.findOne(productEntity.id);

      expect(product).toBeTruthy();
      expect(product).toStrictEqual(productEntity);
    });
    it("should return null when product.id no exists", async () => {
      const productExists = await repository.findOne("222");

      expect(productExists).toBeFalsy();
      expect(productExists).toBeNull();
    });
  });

  describe("findAll", () => {
    it("should return empty array", async () => {
      const products = await repository.findAll();

      expect(products).toBeTruthy();
      expect(products.length).toBe(0);
      expect(products).toEqual([]);
    });
    it("should return all products", async () => {
      const product = new Product({
        id: "1",
        category: "category-test",
        description: "description",
        name: "name",
        price: 100,
      });
      const product2 = new Product({
        id: "2",
        category: "category-test",
        description: "description2",
        name: "name2",
        price: 1000,
      });
      const product3 = new Product({
        id: "3",
        category: "category",
        description: "description3",
        name: "name3",
        price: 300,
      });

      await repository.create(product);
      await repository.create(product2);
      await repository.create(product3);

      const products = await repository.findAll();

      expect(products).toBeTruthy();
      expect(products.length).toBe(3);
      expect(products[0]).toEqual(product);
      expect(products[1]).toEqual(product2);
      expect(products[2]).toEqual(product3);
    });
  });

  describe("findAllByCategory", () => {
    it("should return empty array when category not exists", async () => {
      const products = await repository.findAllByCategory("");

      expect(products).toBeTruthy();
      expect(products.length).toBe(0);
      expect(products).toEqual([]);
    });

    it("should find all products by category", async () => {
      const product = new Product({
        id: "1",
        category: "category-test",
        description: "description",
        name: "name",
        price: 100,
      });
      const product2 = new Product({
        id: "2",
        category: "category-test",
        description: "description2",
        name: "name2",
        price: 1000,
      });
      const product3 = new Product({
        id: "3",
        category: "category",
        description: "description3",
        name: "name3",
        price: 300,
      });

      await repository.create(product);
      await repository.create(product2);
      await repository.create(product3);

      const productsCategoryTest = await repository.findAllByCategory(
        "category-test"
      );
      expect(productsCategoryTest).toBeTruthy();
      expect(productsCategoryTest.length).toBe(2);
      expect(productsCategoryTest[0]).toEqual(product);
      expect(productsCategoryTest[1]).toEqual(product2);

      const productsCategory = await repository.findAllByCategory("category");
      expect(productsCategory).toBeTruthy();
      expect(productsCategory.length).toBe(1);
      expect(productsCategory[0]).toEqual(product3);

      const productsWithoutCategory = await repository.findAllByCategory("");
      expect(productsWithoutCategory).toBeTruthy();
      expect(productsWithoutCategory.length).toBe(0);
      expect(productsWithoutCategory).toEqual([]);
    });
  });

  describe("create", () => {
    it("should persist new product", async () => {
      const productEntity = new Product({
        id: "1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });

      await repository.create(productEntity);

      const product = await repository.findOne(productEntity.id);

      expect(product).toBeTruthy();
      expect(product).toStrictEqual(productEntity);
    });
  });

  describe("delete", () => {
    it("should remove a product by id", async () => {
      const productEntity = new Product({
        id: "1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });

      await repository.create(productEntity);

      const product = await repository.findOne(productEntity.id);

      expect(product).toBeTruthy();
      expect(product?.id).toBe(productEntity.id);

      await repository.delete(productEntity.id);

      const productExists = await repository.findOne(productEntity.id);

      expect(productExists).toBeFalsy();
      expect(productExists).toBeNull();
    });
  });

  describe("update", () => {
    it("should update a product by id", async () => {
      const productEntity = new Product({
        id: "1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });

      await repository.create(productEntity);

      const product = await repository.findOne(productEntity.id);

      expect(product).toBeTruthy();
      expect(product).toHaveProperty("id");
      expect(product).toStrictEqual(productEntity);

      await repository.update(String(product?.id), {
        category: "new-category",
        description: "new-description",
      });

      const changedProduct = await repository.findOne(String(product?.id));

      expect(changedProduct).toBeTruthy();
      expect(changedProduct).toHaveProperty("id");
      expect(changedProduct).toHaveProperty("category");
      expect(changedProduct).toHaveProperty("description");

      expect(changedProduct?.category).toBe("new-category");
      expect(changedProduct?.description).toBe("new-description");
    });
  });
});
