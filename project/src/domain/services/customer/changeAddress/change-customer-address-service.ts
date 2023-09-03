import { Customer } from "../../../entities";
import { DomainException } from "../../../errors";
import { Address } from "../../../value-objects";
import { EventProvider } from "../create/create-customer-event-provider";

type AddressType = {
  city: string;
  country: string;
  number: string;
  street: string;
  zipcode: string;
};

export class ChangeCustomerAddressService {
  private event: EventProvider<Customer>;

  constructor({ event }: { event: EventProvider<Customer> }) {
    this.event = event;
  }

  execute(customer: Customer, address: AddressType): void {
    if (!address) {
      throw new DomainException(
        "Address is required to change Customer.address"
      );
    }

    const addressEntity = new Address({
      city: address.city,
      country: address.country,
      number: address.number,
      street: address.street,
      zipcode: address.zipcode,
    });

    customer.changeAddress(addressEntity);

    this.event.register(customer);
  }
}
