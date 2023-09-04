import { EventProvider } from "../../@shared/events/";
import { Customer } from "../../domain/entities";
import { CustomerCreatedEvent } from "../../domain/events/customer/customer-created-event";
import { customerDispatcher } from "../../domain/events/customer/customer-dispatcher";
import { SendLogHandler } from "../../domain/events/customer/handlers/send-log-handler";

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
