import {Injectable, Logger} from "@nestjs/common";
import {EventHandler} from "../interface/event-handler.interface";

@Injectable()
export class EventHandlerRegistryService {
  private readonly logger = new Logger(EventHandlerRegistryService.name);
  private handlers: EventHandler = {};

  public registerHandler(eventType: string, handler: (params: unknown) => void): void {
    if (!this.handlers[eventType]) {
      this.handlers[eventType] = handler
    }
  }

  public triggerHandler(eventType: string, params: unknown): void {
    this.logger.log("Triggering handler for event type", eventType, params)
    const handler = this.getHandler(eventType)
    return handler && handler(params)
  }

  public getAllEventTypes(): string[] {
    return Object.keys(this.handlers)
  }

  private getHandler(eventType: string): (params: unknown) => void {
    return this.handlers[eventType]
  }
}
