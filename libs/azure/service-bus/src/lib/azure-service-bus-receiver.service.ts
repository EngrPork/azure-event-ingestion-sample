import {Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {AZURE_SERVICE_BUS_CLIENT} from "./constants";
import {ServiceBusClient, ServiceBusReceiver} from "@azure/service-bus";
import {QueueHandlerRegistryService} from "./queue-handler-registry.service";

@Injectable()
export class AzureServiceBusReceiverService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(AzureServiceBusReceiverService.name);
  private readonly receivers: Map<string, ServiceBusReceiver> = new Map();

  constructor(
    @Inject(AZURE_SERVICE_BUS_CLIENT)
    private readonly serviceBusClient: ServiceBusClient,
    private readonly handlers: QueueHandlerRegistryService
  ) {
  }

  async onModuleInit(): Promise<void> {
    for (const queueName of this.handlers.getAllQueues()) {
      const receiver = this.getReceiver(queueName);

      receiver.receiveMode = "receiveAndDelete"

      receiver.subscribe({
        processMessage: async (message) => {
          const eventType = message.applicationProperties?.eventType;
          const handler = this.handlers.getHandlers(queueName).find(h => h.eventType === eventType);
          if (handler) {
            await handler.handleMessage(message.body);
          } else {
            this.logger.warn(`No handler found for queue: ${queueName}, event type: ${eventType}`);
          }
        },
        processError: async (error) => {
          this.logger.error(`Error processing message: ${error}`, error);
        },
      })
    }

    this.logger.log(`Subscribed to ${this.handlers.getAllQueues().length} queues`, this.receivers.keys());
  }

  async onModuleDestroy(): Promise<void> {
    for (const receiver of this.receivers.values()) {
      await receiver.close();
    }
    await this.serviceBusClient.close();
  }

  public getReceiver(topic: string): ServiceBusReceiver {
    if (!this.receivers.has(topic)) {
      console.log("Creating receiver for topic", topic)
      const receiver = this.serviceBusClient.createReceiver(topic);
      this.receivers.set(topic, receiver);
    }
    return this.receivers.get(topic);
  }
}
