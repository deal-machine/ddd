import { Customer } from "../entities/customer";
import { CustomerFactory } from "./customer-factory";

describe("Customer Factory", () => {
  it("should create customer", () => {
    const customer = CustomerFactory.create("Douglas");
    expect(customer).toBeInstanceOf(Customer);
  });
  it("should create customer with address", () => {
    const customer = CustomerFactory.createWithAddress("Douglas", {
      city: "address.city",
      country: "address.country",
      number: "address.number",
      street: "address.street",
      zipcode: "address.zipcode",
    });
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.address).toBeTruthy();
  });
});
