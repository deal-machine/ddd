import { AddressAttributes } from "../../value-objects/address/address-protocol";

export type CustomerConstructor = {
  id: string;
  name: string;
};

export interface ICustomer {
  changeName: (name: string) => void;
  activate: () => void;
  deactivate: () => void;
  changeAddress: (address: AddressAttributes) => void;

  get name(): string;
  get id(): string;
  get address(): AddressAttributes;
  get status(): boolean;
  get rewardPoints(): number;
}
