import {
  AttributeException,
  DomainException,
  NotFoundException,
} from "../../errors/index";
import { Address } from "../../value-objects";
import { CustomerConstructor, ICustomer } from "./customer-protocol";

export class Customer implements ICustomer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _status: boolean;
  private _rewardPoints: number = 0;

  constructor({ id, name }: CustomerConstructor) {
    this.validate({ id, name });

    this._id = id;
    this._name = name;
    this._status = true;
  }

  private validate({ id, name }: CustomerConstructor) {
    if (!id) throw new AttributeException("id is required");

    if (!name) throw new AttributeException("name is required");
  }

  changeName(name: string) {
    const nameLength = name.length;
    if (nameLength < 1 || nameLength > 100)
      throw new DomainException("the name should have a valid length");

    this._name = name;
  }

  activate() {
    this._status = true;
  }

  deactivate() {
    this._status = false;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    if (!this._address) throw new NotFoundException("address not found");
    return this._address;
  }

  get status(): boolean {
    return this._status;
  }

  increaseRewardPoints(value: number): number {
    if (value < 1) throw new DomainException("value should be positive");

    this._rewardPoints += value;
    return this._rewardPoints;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
}
