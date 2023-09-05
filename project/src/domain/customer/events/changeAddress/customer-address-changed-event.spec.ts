import { CustomerAddressChangedEvent } from "./customer-address-changed-event";
import { customerDispatcher } from "../customer-dispatcher";
import { SendLogWhenAddressIsChanged } from "./handlers/send-log-when-address-is-changed-handler";
import { Customer } from "../../entities/customer";
import { Address } from "../../value-objects";

describe("Customer Address Changed Event", () => {
  beforeEach(() => {
    customerDispatcher.unregisterAll();
  });

  describe("register", () => {
    it("should register an event handler", () => {
      const eventHandler = new SendLogWhenAddressIsChanged();
      customerDispatcher.register("CustomerAddressChangedEvent", eventHandler);

      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
          .length
      ).toBe(1);
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
      ).toStrictEqual(eventHandler);
    });
  });

  describe("unregister", () => {
    it("should unregister eventHandlers", () => {
      const eventToUnregisterHandler = new SendLogWhenAddressIsChanged();
      const eventToUnregisterHandler2 = new SendLogWhenAddressIsChanged();
      const eventToUnregisterHandler3 = new SendLogWhenAddressIsChanged();
      customerDispatcher.register(
        "CustomerAddressChangedEvent",
        eventToUnregisterHandler
      );
      customerDispatcher.register(
        "CustomerAddressChangedEvent",
        eventToUnregisterHandler2
      );
      customerDispatcher.register(
        "CustomerAddressChangedEvent",
        eventToUnregisterHandler3
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
          .length
      ).toBe(3);
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toMatchObject([
        eventToUnregisterHandler,
        eventToUnregisterHandler2,
        eventToUnregisterHandler3,
      ]);

      customerDispatcher.unregister(
        "CustomerAddressChangedEvent",
        eventToUnregisterHandler
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
          .length
      ).toBe(2);

      customerDispatcher.unregister(
        "CustomerAddressChangedEvent",
        eventToUnregisterHandler2
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
          .length
      ).toBe(1);

      customerDispatcher.unregister(
        "CustomerAddressChangedEvent",
        eventToUnregisterHandler3
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toStrictEqual([]);
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
          .length
      ).toBe(0);
    });
  });

  describe("unregisterAll", () => {
    it("should unregister all eventHandlers", () => {
      const eventToUnregisterAllHandler = new SendLogWhenAddressIsChanged();
      const eventToUnregisterAllHandler2 = new SendLogWhenAddressIsChanged();
      const eventToUnregisterAllHandler3 = new SendLogWhenAddressIsChanged();
      customerDispatcher.register(
        "CustomerAddressChangedEvent",
        eventToUnregisterAllHandler
      );
      customerDispatcher.register(
        "CustomerAddressChangedEvent",
        eventToUnregisterAllHandler2
      );
      customerDispatcher.register(
        "CustomerAddressChangedEvent",
        eventToUnregisterAllHandler3
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
          .length
      ).toBe(3);
      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toMatchObject([
        eventToUnregisterAllHandler,
        eventToUnregisterAllHandler2,
        eventToUnregisterAllHandler3,
      ]);

      customerDispatcher.unregisterAll();

      expect(
        customerDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeUndefined();
      expect(customerDispatcher.getEventHandlers).toStrictEqual({});
    });
  });

  describe("notify", () => {
    it("should notify ", () => {
      const eventLogHandler = new SendLogWhenAddressIsChanged();

      const handlerSpy = jest.spyOn(eventLogHandler, "handle");

      customerDispatcher.register(
        "CustomerAddressChangedEvent",
        eventLogHandler
      );
      const customer = new Customer({ id: "1", name: "Testing Name" });
      const address = new Address({
        city: "testing city",
        country: "testing country",
        number: "testing number",
        street: "testing street",
        zipcode: "testing zipcode",
      });
      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        id: customer.id,
        name: customer.name,
        address,
      });

      customerDispatcher.notify(customerAddressChangedEvent);

      expect(handlerSpy).toHaveBeenCalled();
      expect(handlerSpy).toHaveBeenCalledWith(customerAddressChangedEvent);
    });
  });
});
