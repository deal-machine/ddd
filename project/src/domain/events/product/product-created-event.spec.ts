import { SendEmailWhenProductIsCreatedHandler } from "./handlers/send-mail-when-product-is-created-handler";
import { SendNotifyWhenProductIsCreatedHandler } from "./handlers/send-notify-when-product-is-created-handler";
import { ProductCreatedEvent } from "./product-created-event";
import { productDispatcher } from "./product-dispatcher";

describe("Product Created Event", () => {
  beforeEach(() => {
    productDispatcher.unregisterAll();
  });
  describe("register", () => {
    it("should register an event handler", () => {
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      productDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(1);
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toStrictEqual(eventHandler);
    });
  });

  describe("unregister", () => {
    it("should unregister eventHandlers", () => {
      const eventToUnregisterHandler =
        new SendEmailWhenProductIsCreatedHandler();
      const eventToUnregisterHandler2 =
        new SendEmailWhenProductIsCreatedHandler();
      const eventToUnregisterHandler3 =
        new SendEmailWhenProductIsCreatedHandler();
      productDispatcher.register(
        "ProductCreatedEvent",
        eventToUnregisterHandler
      );
      productDispatcher.register(
        "ProductCreatedEvent",
        eventToUnregisterHandler2
      );
      productDispatcher.register(
        "ProductCreatedEvent",
        eventToUnregisterHandler3
      );

      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(3);
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toMatchObject([
        eventToUnregisterHandler,
        eventToUnregisterHandler2,
        eventToUnregisterHandler3,
      ]);

      productDispatcher.unregister(
        "ProductCreatedEvent",
        eventToUnregisterHandler
      );

      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(2);

      productDispatcher.unregister(
        "ProductCreatedEvent",
        eventToUnregisterHandler2
      );

      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(1);

      productDispatcher.unregister(
        "ProductCreatedEvent",
        eventToUnregisterHandler3
      );

      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toStrictEqual([]);
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(0);
    });
  });

  describe("unregisterAll", () => {
    it("should unregister all eventHandlers", () => {
      const eventToUnregisterAllHandler =
        new SendEmailWhenProductIsCreatedHandler();
      const eventToUnregisterAllHandler2 =
        new SendEmailWhenProductIsCreatedHandler();
      const eventToUnregisterAllHandler3 =
        new SendEmailWhenProductIsCreatedHandler();
      productDispatcher.register(
        "ProductCreatedEvent",
        eventToUnregisterAllHandler
      );
      productDispatcher.register(
        "ProductCreatedEvent",
        eventToUnregisterAllHandler2
      );
      productDispatcher.register(
        "ProductCreatedEvent",
        eventToUnregisterAllHandler3
      );

      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(3);
      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toMatchObject([
        eventToUnregisterAllHandler,
        eventToUnregisterAllHandler2,
        eventToUnregisterAllHandler3,
      ]);

      productDispatcher.unregisterAll();

      expect(
        productDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
      expect(productDispatcher.getEventHandlers).toStrictEqual({});
    });
  });

  describe("notify", () => {
    it("should notify ", () => {
      const eventHandlerToNotify = new SendEmailWhenProductIsCreatedHandler();
      const handlerSpy = jest.spyOn(eventHandlerToNotify, "handle");
      const notifyHandler = new SendNotifyWhenProductIsCreatedHandler();
      const notifyHandlerSpy = jest.spyOn(notifyHandler, "handle");

      productDispatcher.register("ProductCreatedEvent", eventHandlerToNotify);
      productDispatcher.register("ProductCreatedEvent", notifyHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        email: "deal-machine",
      });
      const productCreatedEvent2 = new ProductCreatedEvent({
        cellphone: "15998998998",
      });
      productDispatcher.notify(productCreatedEvent);

      productDispatcher.notify(productCreatedEvent2);

      expect(handlerSpy).toHaveBeenCalled();
      expect(handlerSpy).toHaveBeenCalledWith(productCreatedEvent);
      expect(notifyHandlerSpy).toHaveBeenCalled();
      expect(notifyHandlerSpy).toHaveBeenCalledWith(productCreatedEvent2);
    });
  });
});
