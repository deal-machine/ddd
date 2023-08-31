export type AddressAttributes = {
  zipcode: string;
  number: number | string;
  street: string;
  country: string;
  city: string;
};

export type AddressConstructor = {
  zipcode: string;
  number: number | string;
  street: string;
  country: string;
  city: string;
};

export interface IAddress {
  toString: () => string;
}
