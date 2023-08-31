import {
  AttributeException,
  DomainException,
  NotFoundException,
} from "../../errors/index";
import { AddressAttributes } from "../../value-objects/address/address-protocol";
import { CustomerConstructor, ICustomer } from "./customer-protocol";

export class Customer implements ICustomer {
  private id: string;
  private name: string;
  private address!: AddressAttributes;
  private status: boolean;
  private rewardPoints: number = 0;

  constructor({ id, name }: CustomerConstructor) {
    this.validate({ id, name });

    this.id = id;
    this.name = name;
    this.status = true;
  }

  private validate({ id, name }: CustomerConstructor) {
    if (!id) throw new AttributeException("id is required");

    if (!name) throw new AttributeException("name is required");
  }

  changeName(name: string) {
    const nameLength = name.length;
    if (nameLength < 1 || nameLength > 100)
      throw new DomainException("the name should have a valid length");

    this.name = name;
  }

  activate() {
    this.status = true;
  }

  deactivate() {
    this.status = false;
  }

  changeAddress(address: AddressAttributes) {
    this.address = address;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAddress(): AddressAttributes {
    if (!this.address) throw new NotFoundException("address not found");
    return this.address;
  }

  getStatus(): boolean {
    return this.status;
  }

  increaseRewardPoints(value: number): number {
    if (value < 1) throw new DomainException("value should be positive");

    this.rewardPoints += value;
    return this.rewardPoints;
  }

  getRewardPoints(): number {
    return this.rewardPoints;
  }
}
