import {
  AttributeException,
  DomainException,
  NotFoundException,
} from "../errors/index";
import {
  ICustomer,
  CustomerConstructor,
  AddressAttributes,
} from "../protocols";

export class Customer implements ICustomer {
  private id: string;
  private name: string;
  private address!: AddressAttributes;
  private status: boolean;

  constructor({ id, name }: CustomerConstructor) {
    this.id = id;
    this.name = name;
    this.status = true;

    this.validate();
  }

  private validate() {
    if (!this.id) throw new AttributeException("id is required");

    if (!this.name) throw new AttributeException("name is required");
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
    this.validate();
    return this.id;
  }

  getName(): string {
    this.validate();
    return this.name;
  }

  getAddress(): AddressAttributes {
    if (!this.address) throw new NotFoundException("address not found");
    return this.address;
  }

  getStatus(): boolean {
    return this.status;
  }
}
