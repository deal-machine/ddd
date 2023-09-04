import { EventHandlerInterface } from "../../../../../@shared/events";
import { ProductCreatedEvent } from "../product-created-event";

export class SendNotifyWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    if (event.eventData.cellphone) {
      console.log(
        "... Sending notification to: ",
        event.eventData.cellphone,
        "\n"
      );
    }
  }
}
