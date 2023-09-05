import { EventHandlerInterface } from "../../../../../@shared/events";
import { CustomerAddressChangedEvent } from "../customer-address-changed-event";

export class SendLogWhenAddressIsChanged
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, address } = event.eventData;
    console.log(
      `\nEndereço do cliente: ${id}, ${name} alterado para: ${JSON.stringify(
        address
      )}\n`
    );
  }
}
