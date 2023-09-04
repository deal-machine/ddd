import { CustomerAddressChangedEvent } from "./customer-address-changed-event";
import { customerDispatcher } from "../customer-dispatcher";
import { SendLogHandler } from "./handlers/send-log-handler";

describe("Customer Address Changed Event", () => {
  beforeEach(() => {
    customerDispatcher.unregisterAll();
  });

  describe("register", () => {
    it("should register an event handler", () => {
      const eventHandler = new SendLogHandler();
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
      const eventToUnregisterHandler = new SendLogHandler();
      const eventToUnregisterHandler2 = new SendLogHandler();
      const eventToUnregisterHandler3 = new SendLogHandler();
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
      const eventToUnregisterAllHandler = new SendLogHandler();
      const eventToUnregisterAllHandler2 = new SendLogHandler();
      const eventToUnregisterAllHandler3 = new SendLogHandler();
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
      const eventLogHandler = new SendLogHandler();

      const handlerSpy = jest.spyOn(eventLogHandler, "handle");

      customerDispatcher.register(
        "CustomerAddressChangedEvent",
        eventLogHandler
      );

      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        message: "Endereço do cliente: {id}, {nome} alterado para: {endereco}",
      });

      customerDispatcher.notify(customerAddressChangedEvent);

      expect(handlerSpy).toHaveBeenCalled();
      expect(handlerSpy).toHaveBeenCalledWith(customerAddressChangedEvent);
    });
  });
});
