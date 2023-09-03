import { Customer } from "../../../entities";
import { CustomerCreatedEvent } from "../../../events/customer/customer-created-event";
import { customerDispatcher } from "../../../events/customer/customer-dispatcher";
import { SendLogHandler } from "../../../events/customer/handlers/send-log-handler";

export interface EventProvider<T> {
  register(value: T): void;
}

export class CreateCustomerEventProvider implements EventProvider<Customer> {
  register(value: Customer): void {
    //crio o handler
    const handler = new SendLogHandler();
    //registro o evento
    customerDispatcher.register("CustomerCreatedEvent", handler);
    //crio o evento
    const event = new CustomerCreatedEvent({
      message: `CustomerCreated: ${value.id}, ${value.name}`,
    });
    //notifico todos os handlers do evento
    customerDispatcher.notify(event);
  }
}
