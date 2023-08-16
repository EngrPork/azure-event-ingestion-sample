import {Injectable} from "@nestjs/common";
import {QueueHandler} from "./interface/queue-handler.interface";

@Injectable()
export class QueueHandlerRegistryService {
  private handlers: { [queueName: string]: QueueHandler[] } = {};

  public registerHandler(queueName: string, handler: QueueHandler): void {
    if (!this.handlers[queueName]) {
      this.handlers[queueName] = [];
    }
    this.handlers[queueName].push(handler);
  }

  public getHandlers(queueName: string): QueueHandler[] {
    return this.handlers[queueName] || [];
  }

  public getAllQueues(): string[] {
    return Object.keys(this.handlers)
  }
}
