import { EventProvider } from "../../@shared/events";
import { Customer } from "../../domain/customer/entities/customer";
import { CustomerAddressChangedEvent } from "../../domain/customer/events/changeAddress/customer-address-changed-event";
import { SendLogHandler } from "../../domain/customer/events/changeAddress/handlers/send-log-handler";
import { customerDispatcher } from "../../domain/customer/events/customer-dispatcher";

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
