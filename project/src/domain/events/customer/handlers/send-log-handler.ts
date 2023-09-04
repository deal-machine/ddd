import { EventHandlerInterface } from "../../../../@shared/events";
import { CustomerCreatedEvent } from "../customer-created-event";

export class SendLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("\n ", event.eventData.message, "\n");
  }
}
