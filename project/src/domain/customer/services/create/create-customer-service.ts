import { IdentifierGeneratorAdapter } from "../../../../@shared/adapters";
import { EventProvider } from "../../../../@shared/events/";
import { Customer } from "../../entities/customer";

interface CreateCustomerServiceConstructor {
  event: EventProvider<Customer>;
  uuid: IdentifierGeneratorAdapter;
}

export class CreateCustomerService {
  private event: EventProvider<Customer>;
  private uuid: IdentifierGeneratorAdapter;

  constructor({ event, uuid }: CreateCustomerServiceConstructor) {
    this.event = event;
    this.event = event;
    this.uuid = uuid;
  }

  execute(name: string): Customer {
    const customer = new Customer({
      id: this.uuid.generate(),
      name,
    });

    this.event.dispatch(customer);

    return customer;
  }
}
