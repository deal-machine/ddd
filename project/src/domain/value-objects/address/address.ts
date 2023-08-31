import { AttributeException } from "../../errors";
import { AddressConstructor, IAddress } from "./address-protocol";

export class Address implements IAddress {
  readonly zipcode: string;
  readonly number: number | string;
  readonly street: string;
  readonly country: string;
  readonly city: string;

  constructor(address: AddressConstructor) {
    this.validate(address);

    this.zipcode = address.zipcode;
    this.number = address.number;
    this.street = address.street;
    this.country = address.country;
    this.city = address.city;
  }

  private validate(address: AddressConstructor): void {
    if (!address.zipcode) throw new AttributeException("zipcode is required");

    if (!address.number) throw new AttributeException("number is required");

    if (!address.street) throw new AttributeException("street is required");

    if (!address.country) throw new AttributeException("country is required");

    if (!address.city) throw new AttributeException("city is required");
  }

  toString(): string {
    return `${this.street}, ${this.number} ${this.city} - ${this.country}`;
  }
}
