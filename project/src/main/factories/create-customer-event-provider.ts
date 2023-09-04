import { EventProvider } from "../../@shared/events";
import { Customer } from "../../domain/customer/entities/customer";
import { CustomerCreatedEvent } from "../../domain/customer/events/create/customer-created-event";
import { SendLogHandler } from "../../domain/customer/events/create/handlers/send-log-handler";
import { customerDispatcher } from "../../domain/customer/events/customer-dispatcher";

export class CreateCustomerEventProvider implements EventProvider<Customer> {
  dispatch(value: Customer): void {
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
