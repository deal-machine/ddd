import { EventDispatcher } from "./event-dispatcher";
import { SendEmailWhenProductIsCreatedHandler } from "./product/handler/send-mail-when-product-is-created-handler";
import { SendNotifyWhenProductIsCreatedHandler } from "./product/handler/send-notify-when-product-is-created-handler";
import { ProductCreatedEvent } from "./product/product-created-event";

describe("Domain Event Dispatcher", () => {
  describe("register", () => {
    it("should register an event handler", () => {
      const dispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      dispatcher.register("ProductCreatedEvent", eventHandler);

      expect(dispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
      expect(dispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
      expect(
        dispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toStrictEqual(eventHandler);
    });
  });

  describe("unregister", () => {
    it("should unregister eventHandlers", () => {
      const dispatcher = new EventDispatcher();

      const eventToUnregisterHandler =
        new SendEmailWhenProductIsCreatedHandler();
      const eventToUnregisterHandler2 =
        new SendEmailWhenProductIsCreatedHandler();
      const eventToUnregisterHandler3 =
        new SendEmailWhenProductIsCreatedHandler();
      dispatcher.register("ProductCreatedEvent", eventToUnregisterHandler);
      dispatcher.register("ProductCreatedEvent", eventToUnregisterHandler2);
      dispatcher.register("ProductCreatedEvent", eventToUnregisterHandler3);

      expect(dispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
      expect(dispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(3);
      expect(dispatcher.getEventHandlers["ProductCreatedEvent"]).toMatchObject([
        eventToUnregisterHandler,
        eventToUnregisterHandler2,
        eventToUnregisterHandler3,
      ]);

      dispatcher.unregister("ProductCreatedEvent", eventToUnregisterHandler);

      expect(dispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
      expect(dispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2);

      dispatcher.unregister("ProductCreatedEvent", eventToUnregisterHandler2);

      expect(dispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
      expect(dispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);

      dispatcher.unregister("ProductCreatedEvent", eventToUnregisterHandler3);

      expect(dispatcher.getEventHandlers["ProductCreatedEvent"]).toStrictEqual(
        []
      );
      expect(dispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });
  });

  describe("unregisterAll", () => {
    it("should unregister all eventHandlers", () => {
      const dispatcher = new EventDispatcher();

      const eventToUnregisterHandler =
        new SendEmailWhenProductIsCreatedHandler();
      const eventToUnregisterHandler2 =
        new SendEmailWhenProductIsCreatedHandler();
      const eventToUnregisterHandler3 =
        new SendEmailWhenProductIsCreatedHandler();
      dispatcher.register("ProductCreatedEvent", eventToUnregisterHandler);
      dispatcher.register("ProductCreatedEvent", eventToUnregisterHandler2);
      dispatcher.register("ProductCreatedEvent", eventToUnregisterHandler3);

      expect(dispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
      expect(dispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(3);
      expect(dispatcher.getEventHandlers["ProductCreatedEvent"]).toMatchObject([
        eventToUnregisterHandler,
        eventToUnregisterHandler2,
        eventToUnregisterHandler3,
      ]);

      dispatcher.unregisterAll();

      expect(
        dispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
      expect(dispatcher.getEventHandlers).toStrictEqual({});
    });
  });

  describe("notify", () => {
    it("should notify ", () => {
      const dispatcher = new EventDispatcher();

      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const handlerSpy = jest.spyOn(eventHandler, "handle");
      const notifyHandler = new SendNotifyWhenProductIsCreatedHandler();
      const notifyHandlerSpy = jest.spyOn(notifyHandler, "handle");

      dispatcher.register("ProductCreatedEvent", eventHandler);
      dispatcher.register("ProductCreatedEvent", notifyHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        email: "deal-machine",
      });
      const productCreatedEvent2 = new ProductCreatedEvent({
        cellphone: "15998998998",
      });
      dispatcher.notify(productCreatedEvent);

      dispatcher.notify(productCreatedEvent2);

      expect(handlerSpy).toHaveBeenCalled();
      expect(handlerSpy).toHaveBeenCalledWith(productCreatedEvent);
      expect(notifyHandlerSpy).toHaveBeenCalled();
      expect(notifyHandlerSpy).toHaveBeenCalledWith(productCreatedEvent2);
    });
  });
});
