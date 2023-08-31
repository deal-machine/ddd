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

      expect(customer.getName()).toBe(newName);
    });
  });
  describe("activate", () => {
    it("should activate and change status to true", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      customer.deactivate();
      expect(customer.getStatus()).toBeFalsy();
      customer.activate();
      expect(customer.getStatus()).toBeTruthy();
    });
  });
  describe("deactivate", () => {
    it("should deactivate and change status to false", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      customer.deactivate();
      expect(customer.getStatus()).toBeFalsy();
    });
  });
  describe("changeAddress", () => {
    it("should change address", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });

      expect(() => customer.getAddress()).toThrowError(NotFoundException);
      expect(() => customer.getAddress()).toThrowError("address not found");

      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      expect(address).toBeTruthy();

      customer.changeAddress(address);
      expect(customer.getAddress()).toBeTruthy();
      expect(customer.getAddress()).toBe(address);
    });
  });
  describe("getName", () => {
    it("shoud return customer name", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      const name = customer.getName();
      expect(name).toBeTruthy();
      expect(name).toBe("name-test");
    });
  });
  describe("getAddress", () => {
    it("shoud throw NotFoundException when address not exists", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });

      expect(() => customer.getAddress()).toThrowError(NotFoundException);
      expect(() => customer.getAddress()).toThrowError("address not found");
    });
    it("shoud return customer address", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      const address = new Address({
        city: "city-test",
        country: "country-test",
        number: "number-test",
        street: "street-test",
        zipcode: "zipcode-test",
      });
      customer.changeAddress(address);

      expect(customer.getAddress()).toBeTruthy();
      expect(customer.getAddress()).toBe(address);
    });
  });
  describe("getStatus", () => {
    it("shoud return customer status", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      const status = customer.getStatus();
      expect(status).toBeTruthy();
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
      expect(customer.getRewardPoints()).toBe(0);
      customer.increaseRewardPoints(100);
      expect(customer.getRewardPoints()).toBe(100);
      customer.increaseRewardPoints(1);
      expect(customer.getRewardPoints()).toBe(101);
    });
  });
  describe("getRewardPoints", () => {
    it("shoud return customer reward points", () => {
      const customer = new Customer({
        id: "id-test",
        name: "name-test",
      });
      expect(customer.getRewardPoints()).toBe(0);
    });
  });
});
