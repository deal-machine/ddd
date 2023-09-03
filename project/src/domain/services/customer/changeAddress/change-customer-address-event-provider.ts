import { Customer } from "../../../entities";
import { CustomerAddressChangedEvent } from "../../../events/customer/customer-address-changed-event";
import { CustomerCreatedEvent } from "../../../events/customer/customer-created-event";
import { customerDispatcher } from "../../../events/customer/customer-dispatcher";
import { SendLogHandler } from "../../../events/customer/handlers/send-log-handler";
import { EventProvider } from "../create/create-customer-event-provider";

export class ChangeAddressCustomerEventProvider
  implements EventProvider<Customer>
{
  register(value: Customer): void {
    //crio o handler
    const handler = new SendLogHandler();
    //registro o evento
    customerDispatcher.register("CustomerAddressChangedEvent", handler);
    //crio o evento
    const event = new CustomerAddressChangedEvent({
      message: `Endereço do cliente: ${value.id}, ${
        value.name
      }, alterado para: ${JSON.stringify(value.address)}`,
    });
    //notifico todos os handlers do evento
    customerDispatcher.notify(event);
  }
}
