import { IAddress } from "../protocols";

export type CustomerConstructor = {
  id: string;
  name: string;
};

export type CustomerAttributes = {
  id: string;
  name: string;
  address: IAddress;
  active: boolean;
};

export interface ICustomer {
  changeName: (name: string) => void;
  activate: () => void;
  deactivate: () => void;
  changeAddress: (address: IAddress) => void;
}
