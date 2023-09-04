import { EventProvider } from "../../@shared/events/";
import { Customer } from "../../domain/entities";
import { CustomerAddressChangedEvent } from "../../domain/events/customer/customer-address-changed-event";
import { customerDispatcher } from "../../domain/events/customer/customer-dispatcher";
import { SendLogHandler } from "../../domain/events/customer/handlers/send-log-handler";

export class ChangeAddressCustomerEventProvider
  implements EventProvider<Customer>
{
  dispatch(value: Customer): void {
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
