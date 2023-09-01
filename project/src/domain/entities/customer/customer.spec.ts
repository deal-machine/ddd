import {
  AttributeException,
  DomainException,
  NotFoundException,
} from "../../errors";
import { Address } from "../../value-objects/address/address";
import { Customer } from "./customer";

describe("Customer Entity", () => {
  describe("constructor validate", () => {
    it("should throw AttributeException when id is empty", () => {
      try {
        new Customer({
          id: "",
          name: "Tester",
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("id is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should throw AttributeException when name is empty", () => {
      try {
        new Customer({
          id: "id",
          name: "",
        });
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(AttributeException);
        expect(error.message).toBe("name is required");
        expect(error.name).toBe("AttributeException");
      }
    });
    it("should create new Customer correctly", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });

      expect(customer).toBeTruthy();
      expect(customer).toHaveProperty("id");
      expect(customer).toHaveProperty("name");
      expect(customer).toHaveProperty("status");

      const address = new Address({
        city: "city",
        country: "country",
        number: 1,
        street: "street",
        zipcode: "zipcode",
      });

      customer.changeAddress(address);

      expect(customer).toHaveProperty("address");
    });
  });
  describe("changeName", () => {
    it("should throw DomainException when name length is less than 1", () => {
      try {
        const customer = new Customer({
          id: "id-test",
          name: "name-test",
        });
        customer.changeName("");
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toBe("the name should have a valid length");
        expect(error.name).toBe("DomainException");
      }
    });
    it("should throw DomainException when name length is more than 100", () => {
      try {
        const customer = new Customer({
          id: "id-test",
          name: "name-test",
        });
        const bigName = "test-".repeat(20) + "test";
        customer.changeName(bigName);
      } catch (error: any) {
        expect(error).toBeTruthy();
        expect(error).toBeInstanceOf(DomainException);
        expect(error.message).toBe("the name should have a valid length");
        expect(error.name).toBe("DomainException");
      }
    });
    it("should change name correctly", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });

      const newName = "valid-name-test";
      customer.changeName(newName);

      expect(customer.name).toBe(newName);
    });
  });
  describe("activate", () => {
    it("should activate and change status to true", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      customer.deactivate();
      expect(customer.status).toBeFalsy();
      customer.activate();
      expect(customer.status).toBeTruthy();
    });
  });
  describe("deactivate", () => {
    it("should deactivate and change status to false", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      customer.deactivate();
      expect(customer.status).toBeFalsy();
    });
  });
  describe("changeAddress", () => {
    it("should change address", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });

      expect(() => customer.address).toThrowError(NotFoundException);
      expect(() => customer.address).toThrowError("address not found");

      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      expect(address).toBeTruthy();

      customer.changeAddress(address);
      expect(customer.address).toBeTruthy();
      expect(customer.address).toBe(address);
    });
  });
  describe("increaseRewardPoints", () => {
    it("should throw DomainException when value is less than 0", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      expect(() => customer.increaseRewardPoints(-1)).toThrowError(
        DomainException
      );
      expect(() => customer.increaseRewardPoints(0)).toThrowError(
        "value should be positive"
      );
    });
    it("shoud increase value in customer reward points", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      expect(customer.rewardPoints).toBe(0);
      customer.increaseRewardPoints(100);
      expect(customer.rewardPoints).toBe(100);
      customer.increaseRewardPoints(1);
      expect(customer.rewardPoints).toBe(101);
    });
  });
  describe("getRewardPoints", () => {
    it("shoud return customer reward points", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      expect(customer.rewardPoints).toBe(0);
    });
  });
});
