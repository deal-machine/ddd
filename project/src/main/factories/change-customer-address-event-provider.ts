import { EventProvider } from "../../@shared/events";
import { Customer } from "../../domain/customer/entities/customer";
import { CustomerAddressChangedEvent } from "../../domain/customer/events/changeAddress/customer-address-changed-event";
import { SendLogWhenAddressIsChanged } from "../../domain/customer/events/changeAddress/handlers/send-log-when-address-is-changed-handler";
import { customerDispatcher } from "../../domain/customer/events/customer-dispatcher";

export class ChangeAddressCustomerEventProvider
  implements EventProvider<Customer>
{
  dispatch(value: Customer): void {
    //crio o handler
    const handler = new SendLogWhenAddressIsChanged();
    //registro o evento
    customerDispatcher.register("CustomerAddressChangedEvent", handler);
    //crio o evento
    const event = new CustomerAddressChangedEvent({
      id: value.id,
      address: value.address,
      name: value.name,
    });
    //notifico todos os handlers do evento
    customerDispatcher.notify(event);
  }
}
