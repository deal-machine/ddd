import { EventProvider } from "../../@shared/events";
import { Customer } from "../../domain/customer/entities/customer";
import { CustomerCreatedEvent } from "../../domain/customer/events/create/customer-created-event";
import { SendLogHandler } from "../../domain/customer/events/create/handlers/send-log-handler";
import { SendLogHandler2 } from "../../domain/customer/events/create/handlers/send-log2-handler";
import { customerDispatcher } from "../../domain/customer/events/customer-dispatcher";

export class CreateCustomerEventProvider implements EventProvider<Customer> {
  dispatch(): void {
    //crio o handler
    const handler = new SendLogHandler();

    const handler2 = new SendLogHandler2();
    //registro o evento
    customerDispatcher.register("CustomerCreatedEvent", handler);
    customerDispatcher.register("CustomerCreatedEvent", handler2);

    //crio o evento
    const event = new CustomerCreatedEvent("CustomerCreated");
    //notifico todos os handlers do evento
    customerDispatcher.notify(event);
  }
}
