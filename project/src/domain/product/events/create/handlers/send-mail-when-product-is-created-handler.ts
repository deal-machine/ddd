import { EventHandlerInterface } from "../../../../../@shared/events";
import { ProductCreatedEvent } from "../product-created-event";

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    if (event.eventData.email) {
      console.log("... Sending email to: ", event.eventData.email, "\n");
    }
  }
}
