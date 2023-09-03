import { EventInterface } from "../";

export class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: any;
  name: string;

  constructor(eventData: any) {
    this.eventData = eventData;
    this.dateTimeOcurred = new Date();
    this.name = "CustomerAddressChangedEvent";
  }
}
