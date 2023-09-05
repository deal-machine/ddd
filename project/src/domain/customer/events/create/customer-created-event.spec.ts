import { customerDispatcher } from "../customer-dispatcher";
import { CustomerCreatedEvent } from "./customer-created-event";
import { SendLogHandler } from "./handlers/send-log-handler";
import { SendLogHandler2 } from "./handlers/send-log2-handler";

describe("Customer Created Event", () => {
  beforeEach(() => {
    customerDispatcher.unregisterAll();
  });
  describe("register", () => {
    it("should register an event handler", () => {
      const eventHandler = new SendLogHandler();
      customerDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(1);
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toStrictEqual(eventHandler);
    });
  });

  describe("unregister", () => {
    it("should unregister eventHandlers", () => {
      const eventToUnregisterHandler = new SendLogHandler();
      const eventToUnregisterHandler2 = new SendLogHandler();
      const eventToUnregisterHandler3 = new SendLogHandler();
      customerDispatcher.register(
        "CustomerCreatedEvent",
        eventToUnregisterHandler
      );
      customerDispatcher.register(
        "CustomerCreatedEvent",
        eventToUnregisterHandler2
      );
      customerDispatcher.register(
        "CustomerCreatedEvent",
        eventToUnregisterHandler3
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(3);
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toMatchObject([
        eventToUnregisterHandler,
        eventToUnregisterHandler2,
        eventToUnregisterHandler3,
      ]);

      customerDispatcher.unregister(
        "CustomerCreatedEvent",
        eventToUnregisterHandler
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(2);

      customerDispatcher.unregister(
        "CustomerCreatedEvent",
        eventToUnregisterHandler2
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(1);

      customerDispatcher.unregister(
        "CustomerCreatedEvent",
        eventToUnregisterHandler3
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toStrictEqual([]);
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(0);
    });
  });

  describe("unregisterAll", () => {
    it("should unregister all eventHandlers", () => {
      const eventToUnregisterAllHandler = new SendLogHandler();
      const eventToUnregisterAllHandler2 = new SendLogHandler();
      const eventToUnregisterAllHandler3 = new SendLogHandler();
      customerDispatcher.register(
        "CustomerCreatedEvent",
        eventToUnregisterAllHandler
      );
      customerDispatcher.register(
        "CustomerCreatedEvent",
        eventToUnregisterAllHandler2
      );
      customerDispatcher.register(
        "CustomerCreatedEvent",
        eventToUnregisterAllHandler3
      );

      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(3);
      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toMatchObject([
        eventToUnregisterAllHandler,
        eventToUnregisterAllHandler2,
        eventToUnregisterAllHandler3,
      ]);

      customerDispatcher.unregisterAll();

      expect(
        customerDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
      expect(customerDispatcher.getEventHandlers).toStrictEqual({});
    });
  });

  describe("notify", () => {
    it("should notify ", () => {
      const eventLogHandler = new SendLogHandler();
      const eventLogHandler2 = new SendLogHandler2();

      const handlerSpy = jest.spyOn(eventLogHandler, "handle");

      customerDispatcher.register("CustomerCreatedEvent", eventLogHandler);
      customerDispatcher.register("CustomerCreatedEvent", eventLogHandler2);

      const customerCreatedEvent = new CustomerCreatedEvent("CustomerCreated");
      const customerCreatedEvent2 = new CustomerCreatedEvent("CustomerCreated");

      customerDispatcher.notify(customerCreatedEvent);
      customerDispatcher.notify(customerCreatedEvent2);

      expect(handlerSpy).toHaveBeenCalled();
      expect(handlerSpy).toHaveBeenCalledWith(customerCreatedEvent);
    });
  });
});
