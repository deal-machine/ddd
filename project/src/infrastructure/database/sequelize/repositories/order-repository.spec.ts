import { closeDatabase, initDatabase } from "..";
import {
  Customer,
  Order,
  OrderItem,
  Product,
} from "../../../../domain/entities";
import {
  CustomerRepository,
  OrderRepository,
  ProductRepository,
} from "../../../../domain/repositories/";
import { Address } from "../../../../domain/value-objects";
import { OrderItemModel } from "../models";
import { SequelizeCustomerRepository } from "./customer-repository";
import { SequelizeOrderRepository } from "./order-repository";
import { SequelizeProductRepository } from "./product-repository";

let orderRepository: OrderRepository;
let customerRepository: CustomerRepository;
let productRepository: ProductRepository;

describe("Sequelize Order Repository", () => {
  beforeEach(async () => {
    await initDatabase();
    customerRepository = new SequelizeCustomerRepository();
    productRepository = new SequelizeProductRepository();
    orderRepository = new SequelizeOrderRepository();
  });
  afterEach(async () => closeDatabase());

  describe("findOne", () => {
    it("should find one by id", async () => {
      const customerEntity = new Customer({
        id: "1",
        name: "name",
      });
      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      customerEntity.changeAddress(address);
      customerEntity.increaseRewardPoints(100.52);
      await customerRepository.create(customerEntity);

      const productEntity = new Product({
        id: "productEntity1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });
      await productRepository.create(productEntity);

      const orderItem = new OrderItem({
        id: "id-test",
        name: "name-test",
        price: 150,
        productId: productEntity.id,
        quantity: 3,
      });

      const order = new Order({
        id: "order-id",
        customerId: customerEntity.id,
        items: [orderItem],
      });
      await orderRepository.create(order);

      const orderModel = await orderRepository.findOne("order-id");

      expect(orderModel).toBeTruthy();
      expect(orderModel?.id).toBe(order.id);
      expect(orderModel?.total).toBe(450);
      expect(orderModel?.customerId).toBe(customerEntity.id);
      expect(orderModel?.items).toStrictEqual([orderItem]);
      expect(orderModel).toStrictEqual(order);
    });
    it("should return null when order.id no exists", async () => {
      const orderExists = await orderRepository.findOne("222");

      expect(orderExists).toBeFalsy();
      expect(orderExists).toBeNull();
    });
  });

  describe("findAll", () => {
    it("should return empty array", async () => {
      const orders = await orderRepository.findAll();

      expect(orders).toBeTruthy();
      expect(orders.length).toBe(0);
      expect(orders).toEqual([]);
    });
    it("should return all orders", async () => {
      const customerEntity = new Customer({
        id: "1",
        name: "name",
      });
      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      customerEntity.changeAddress(address);
      customerEntity.increaseRewardPoints(100);
      await customerRepository.create(customerEntity);

      const productEntity = new Product({
        id: "productEntity1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });
      await productRepository.create(productEntity);

      const orderItem = new OrderItem({
        id: "id-test",
        name: "name-test",
        price: 150,
        productId: productEntity.id,
        quantity: 2,
      });
      const orderItem2 = new OrderItem({
        id: "id-test-2",
        name: "name-test",
        price: 15,
        productId: productEntity.id,
        quantity: 2,
      });

      const order = new Order({
        id: "order-id",
        customerId: customerEntity.id,
        items: [orderItem, orderItem2],
      });
      await orderRepository.create(order);

      const ordersModel = await orderRepository.findAll();

      expect(ordersModel).toBeTruthy();
      expect(ordersModel.length).toBe(1);
      expect(ordersModel[0].id).toBe(order.id);
      expect(ordersModel[0].total).toBe(330);
      expect(ordersModel[0].customerId).toBe(customerEntity.id);
      expect(ordersModel[0].items.length).toBe(2);
      expect(ordersModel[0].items[0]).toStrictEqual(orderItem);
      expect(ordersModel[0].items[1]).toStrictEqual(orderItem2);
    });
  });

  describe("create", () => {
    it("should persist new order", async () => {
      const customerEntity = new Customer({
        id: "1",
        name: "name",
      });
      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      customerEntity.changeAddress(address);
      customerEntity.increaseRewardPoints(100.52);
      await customerRepository.create(customerEntity);

      const productEntity = new Product({
        id: "productEntity1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });
      await productRepository.create(productEntity);

      const orderItem = new OrderItem({
        id: "id-test",
        name: "name-test",
        price: 150,
        productId: productEntity.id,
        quantity: 3,
      });
      const orderItem2 = new OrderItem({
        id: "id-test2",
        name: "name-test",
        price: 150,
        productId: productEntity.id,
        quantity: 3,
      });
      const orderItem3 = new OrderItem({
        id: "id-test3",
        name: "name-test",
        price: 150,
        productId: productEntity.id,
        quantity: 3,
      });

      const order = new Order({
        id: "order-id",
        customerId: customerEntity.id,
        items: [orderItem, orderItem2, orderItem3],
      });
      await orderRepository.create(order);

      const orderModelExists = await orderRepository.findOne("order-id");

      expect(orderModelExists).toBeTruthy();
      expect(orderModelExists?.id).toBe(order.id);
      expect(orderModelExists?.total).toBe(1350);
      expect(orderModelExists?.customerId).toBe(customerEntity.id);
      expect(orderModelExists?.items).toStrictEqual([
        orderItem,
        orderItem2,
        orderItem3,
      ]);
      expect(orderModelExists).toStrictEqual(order);

      const orderItemModel = await OrderItemModel.findAll({
        where: { orderId: orderModelExists?.id },
      });
      expect(orderItemModel).toBeTruthy();
      expect(orderItemModel.length).toBe(3);
    });
  });

  describe("delete", () => {
    it("should remove a order and the orderm items by order.id", async () => {
      const customer = new Customer({
        id: "1",
        name: "name",
      });
      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      customer.changeAddress(address);
      await customerRepository.create(customer);
      const productEntity = new Product({
        id: "productEntity1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });
      await productRepository.create(productEntity);
      const orderItem = new OrderItem({
        id: "id-test",
        name: "name-test",
        price: 150,
        productId: productEntity.id,
        quantity: 3,
      });
      const order = new Order({
        id: "order-id",
        customerId: customer.id,
        items: [orderItem],
      });
      await orderRepository.create(order);

      await orderRepository.delete(order.id);

      const orderNotExists = await orderRepository.findOne("order-id");

      expect(orderNotExists).toBeNull();
      const orderItemModel = await OrderItemModel.findByPk(orderItem.id);
      expect(orderItemModel).toBeNull();
    });
  });

  describe("update", () => {
    it("should update a order by id", async () => {
      const customer = new Customer({
        id: "1",
        name: "name",
      });
      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      customer.changeAddress(address);
      customer.increaseRewardPoints(1);
      await customerRepository.create(customer);
      const product = new Product({
        id: "product1",
        category: "category",
        description: "description",
        name: "name",
        price: 30,
      });
      await productRepository.create(product);
      const orderItem = new OrderItem({
        id: "id-test",
        name: "name-test",
        price: 150,
        productId: product.id,
        quantity: 3,
      });
      const order = new Order({
        id: "order-id",
        customerId: customer.id,
        items: [orderItem],
      });
      await orderRepository.create(order);
      const orderModel = await orderRepository.findOne("order-id");

      expect(orderModel).toBeTruthy();
      expect(orderModel?.id).toBe(order.id);
      expect(orderModel?.total).toBe(450);
      expect(orderModel?.customerId).toBe(customer.id);
      expect(orderModel?.items).toStrictEqual([orderItem]);
      expect(orderModel).toStrictEqual(order);

      const customerTwo = new Customer({
        id: "2",
        name: "nameTwo",
      });
      customerTwo.changeAddress(address);
      customerRepository.create(customerTwo);

      await orderRepository.update(order.id, {
        customerId: customerTwo.id,
      });
      const orderModelUpdated = await orderRepository.findOne("order-id");
      expect(orderModelUpdated).toBeTruthy();
      expect(orderModelUpdated?.customerId).toBe("2");
    });
  });
});
