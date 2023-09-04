import { EventDispatcherInterface } from "./event-dispatcher-protocol";
import { EventHandlerInterface } from "./event-handler-protocol";
import { EventInterface } from "./event-protocol";

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: {
    [eventName: string]: EventHandlerInterface[];
  } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    if (this.eventHandlers[event.name]) {
      this.eventHandlers[event.name].forEach((handler) =>
        handler.handle(event)
      );
    }
  }

  register(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
