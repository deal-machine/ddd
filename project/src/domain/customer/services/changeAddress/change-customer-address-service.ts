import { EventProvider } from "../../../../@shared/events/";
import { DomainException } from "../../../../@shared/errors";
import { Customer } from "../../entities/customer";
import { Address } from "../../value-objects";

interface AddressType {
  city: string;
  country: string;
  number: string;
  street: string;
  zipcode: string;
  [key: string]: any; // index signature
}

export class ChangeCustomerAddressService {
  private event: EventProvider<Customer>;

  constructor({ event }: { event: EventProvider<Customer> }) {
    this.event = event;
  }

  execute(customer: Customer, address: AddressType): void {
    const requiredFields = ["city", "country", "number", "street", "zipcode"];
    requiredFields.forEach((field) => {
      if (!address[field]) {
        throw new DomainException(`${field} is required to change Address`);
      }
    });

    const addressEntity = new Address({
      city: address.city,
      country: address.country,
      number: address.number,
      street: address.street,
      zipcode: address.zipcode,
    });

    customer.changeAddress(addressEntity);

    this.event.dispatch(customer);
  }
}
