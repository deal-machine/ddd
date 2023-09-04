import { EventInterface } from "./event-protocol";

export interface EventHandlerInterface<
  T extends EventInterface = EventInterface
> {
  handle(event: T): void;
}
