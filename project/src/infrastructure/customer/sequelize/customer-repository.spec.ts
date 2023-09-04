import { Customer } from "../../../domain/customer/entities/customer";
import { CustomerRepository } from "../../../domain/customer/repositories/customer-repository-protocol";
import { Address } from "../../../domain/customer/value-objects";
import { closeDatabase, initDatabase } from "../../@shared/database/sequelize";

import { SequelizeCustomerRepository } from "./customer-repository";

let repository: CustomerRepository;

describe("Sequelize Customer Repository", () => {
  beforeEach(async () => {
    await initDatabase();
    repository = new SequelizeCustomerRepository();
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

      await repository.create(customerEntity);

      const customer = await repository.findOne(customerEntity.id);

      expect(customer).toBeTruthy();
      expect(customer?.rewardPoints).toBe(100.52);
      expect(customer?.address).toStrictEqual(address);
      expect(customer).toStrictEqual(customerEntity);
    });
    it("should return null when customer.id no exists", async () => {
      const customerExists = await repository.findOne("222");

      expect(customerExists).toBeFalsy();
      expect(customerExists).toBeNull();
    });
  });

  describe("findAll", () => {
    it("should return empty array", async () => {
      const customer = await repository.findAll();

      expect(customer).toBeTruthy();
      expect(customer.length).toBe(0);
      expect(customer).toEqual([]);
    });
    it("should return all customers", async () => {
      const address = new Address({
        city: "test.city",
        country: "test.country",
        number: "test.number",
        street: "test.street",
        zipcode: "test.zipcode",
      });

      const customer = new Customer({
        id: "1",
        name: "name",
      });
      customer.changeAddress(address);
      const customer2 = new Customer({
        id: "2",
        name: "name2",
      });
      customer2.changeAddress(address);
      const customer3 = new Customer({
        id: "3",
        name: "name3",
      });
      customer3.changeAddress(address);
      customer3.increaseRewardPoints(100);

      await repository.create(customer);
      await repository.create(customer2);
      await repository.create(customer3);

      const customers = await repository.findAll();

      expect(customers).toBeTruthy();
      expect(customers.length).toBe(3);
      expect(customers[0]).toEqual(customer);
      expect(customers[1]).toEqual(customer2);
      expect(customers[2]).toEqual(customer3);
    });
  });

  describe("create", () => {
    it("should persist new customer", async () => {
      const customerEntity = new Customer({
        id: "1",
        name: "name",
      });
      const address = new Address({
        city: "test.city",
        country: "test.country",
        number: "test.number",
        street: "test.street",
        zipcode: "test.zipcode",
      });
      customerEntity?.changeAddress(address);

      await repository.create(customerEntity);

      const customer = await repository.findOne(customerEntity.id);

      expect(customer).toBeTruthy();
      expect(customer).toStrictEqual(customerEntity);
    });
  });

  describe("delete", () => {
    it("should remove a customer by id", async () => {
      const customerEntity = new Customer({
        id: "1",
        name: "name",
      });
      const address = new Address({
        city: "test.city",
        country: "test.country",
        number: "test.number",
        street: "test.street",
        zipcode: "test.zipcode",
      });
      customerEntity.changeAddress(address);

      await repository.create(customerEntity);

      const customer = await repository.findOne(customerEntity.id);

      expect(customer).toBeTruthy();
      expect(customer?.id).toBe(customerEntity.id);

      await repository.delete(customerEntity.id);

      const customerExists = await repository.findOne(customerEntity.id);

      expect(customerExists).toBeFalsy();
      expect(customerExists).toBeNull();
    });
  });

  describe("update", () => {
    it("should update a customer by id", async () => {
      const customerEntity = new Customer({
        id: "1",
        name: "name",
      });
      const address = new Address({
        city: "test.city",
        country: "test.country",
        number: "test.number",
        street: "test.street",
        zipcode: "test.zipcode",
      });
      customerEntity.changeAddress(address);

      await repository.create(customerEntity);

      const customer = await repository.findOne(customerEntity.id);

      expect(customer).toBeTruthy();
      expect(customer).toHaveProperty("id");
      expect(customer).toStrictEqual(customerEntity);

      await repository.update(String(customer?.id), {
        name: "new-name",
      });

      const changedCustomer = await repository.findOne(String(customer?.id));

      expect(changedCustomer).toBeTruthy();
      expect(changedCustomer).toHaveProperty("id");
      expect(changedCustomer?.name).toBe("new-name");
    });
  });
});
