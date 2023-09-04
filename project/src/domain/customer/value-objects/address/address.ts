import { AttributeException } from "../../../../@shared/errors";
import { AddressConstructor, IAddress } from "./address-protocol";

export class Address implements IAddress {
  readonly _street: string;
  readonly _number: string;
  readonly _city: string;
  readonly _zipcode: string;
  readonly _country: string;

  constructor(address: AddressConstructor) {
    this.validate(address);

    this._zipcode = address.zipcode;
    this._number = address.number;
    this._street = address.street;
    this._country = address.country;
    this._city = address.city;
  }

  private validate(address: AddressConstructor): void {
    if (!address.zipcode) throw new AttributeException("zipcode is required");

    if (!address.number) throw new AttributeException("number is required");

    if (!address.street) throw new AttributeException("street is required");

    if (!address.country) throw new AttributeException("country is required");

    if (!address.city) throw new AttributeException("city is required");
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  get zipcode(): string {
    return this._zipcode;
  }
}
