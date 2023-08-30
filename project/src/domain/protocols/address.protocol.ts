export interface IAddress {
  zipcode: string;
  number: number | string;
  street: string;
  country: string;
  city: string;

  toString: () => string;
}
