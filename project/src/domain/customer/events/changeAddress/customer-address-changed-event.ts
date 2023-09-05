import { EventInterface } from "../../../../@shared/events";
import { Address } from "../../value-objects";

interface EventData {
  id: string;
  name: string;
  address: Address;
}
export class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: EventData;
  name: string;

  constructor(eventData: EventData) {
    this.eventData = eventData;
    this.dateTimeOcurred = new Date();
    this.name = "CustomerAddressChangedEvent";
  }
}
