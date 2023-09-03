import { IdentifierGeneratorAdapter } from "../../../../application/protocols";
import { Customer } from "../../../entities";
import { EventProvider } from "./create-customer-event-provider";

interface CreateCustomerServiceConstructor {
  event: EventProvider<Customer>;
  uuid: IdentifierGeneratorAdapter;
}

export class CreateCustomerService {
  private event: EventProvider<Customer>;
  private uuid: IdentifierGeneratorAdapter;

  constructor({ event, uuid }: CreateCustomerServiceConstructor) {
    this.event = event;
    this.uuid = uuid;
  }

  execute(name: string): Customer {
    const customer = new Customer({
      id: this.uuid.generate(),
      name,
    });

    this.event.register(customer);

    return customer;
  }
}
