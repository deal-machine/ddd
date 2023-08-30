import { AttributeException, DomainException } from "../errors/index";
import { ICustomer, IAddress, CustomerConstructor } from "../protocols";

export class Customer implements ICustomer {
  id: string;
  name: string;
  address!: IAddress;
  active: boolean;

  constructor({ id, name }: CustomerConstructor) {
    this.id = id;
    this.name = name;
    this.active = true;

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
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  changeAddress(address: IAddress) {
    this.address = address;
  }
}
