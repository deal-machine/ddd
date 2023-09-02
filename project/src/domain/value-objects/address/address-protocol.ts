export type AddressAttributes = {
  zipcode: string;
  number: string;
  street: string;
  country: string;
  city: string;
};

export type AddressConstructor = {
  zipcode: string;
  number: string;
  street: string;
  country: string;
  city: string;
};

export interface IAddress {
  get street(): string;
  get number(): string;
  get city(): string;
  get country(): string;
  get zipcode(): string;
}
