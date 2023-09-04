import { v4 } from "uuid";
import { Customer } from "../entities/customer";
import { Address } from "../value-objects";

interface IAddress {
  city: string;
  country: string;
  number: string;
  street: string;
  zipcode: string;
}
export class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer({
      id: v4(),
      name,
    });
  }

  public static createWithAddress(name: string, address: IAddress): Customer {
    const customer = new Customer({
      id: v4(),
      name,
    });
    const addressEntity = new Address(address);
    customer.changeAddress(addressEntity);

    return customer;
  }
}
