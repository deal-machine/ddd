import { AttributeException } from "../errors";
import { IAddress } from "../protocols";

export class Address implements IAddress {
  readonly zipcode: string;
  readonly number: number | string;
  readonly street: string;
  readonly country: string;
  readonly city: string;

  constructor(address: IAddress) {
    this.zipcode = address.zipcode;
    this.number = address.number;
    this.street = address.street;
    this.country = address.country;
    this.city = address.city;

    this.validate();
  }

  private validate(): void {
    if (!this.zipcode) throw new AttributeException("zipcode is required");

    if (!this.number) throw new AttributeException("number is required");

    if (!this.street) throw new AttributeException("street is required");

    if (!this.country) throw new AttributeException("country is required");

    if (!this.city) throw new AttributeException("city is required");
  }

  toString(): string {
    return `${this.street}, ${this.number} ${this.city} - ${this.country}`;
  }
}
