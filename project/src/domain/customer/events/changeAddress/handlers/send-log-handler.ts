import { EventHandlerInterface } from "../../../../../@shared/events";
import { CustomerAddressChangedEvent } from "../customer-address-changed-event";

export class SendLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log("\n ", event.eventData.message, "\n");
  }
}
