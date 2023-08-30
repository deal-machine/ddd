import { AddressAttributes } from "../protocols";

export type CustomerConstructor = {
  id: string;
  name: string;
};

export type CustomerAttributes = {
  id: string;
  name: string;
  address: AddressAttributes;
  status: boolean;
};

export interface ICustomer {
  changeName: (name: string) => void;
  activate: () => void;
  deactivate: () => void;
  changeAddress: (address: AddressAttributes) => void;

  getName(): string;
  getId(): string;
  getAddress(): AddressAttributes;
  getStatus(): boolean;
}
