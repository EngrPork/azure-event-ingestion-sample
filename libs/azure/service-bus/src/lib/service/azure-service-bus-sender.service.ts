import {Inject, Injectable, Logger, OnModuleDestroy} from '@nestjs/common';
import {ServiceBusClient, ServiceBusMessage, ServiceBusSender} from "@azure/service-bus";
import {AZURE_SERVICE_BUS_CLIENT} from "../constants";

@Injectable()
export class AzureServiceBusSenderService implements OnModuleDestroy {
  private readonly logger = new Logger(AzureServiceBusSenderService.name);
  private readonly senders: Map<string, ServiceBusSender> = new Map();

  constructor(
    @Inject(AZURE_SERVICE_BUS_CLIENT)
    private readonly serviceBusClient: ServiceBusClient,
  ) {
  }

  public getSender(topic: string): ServiceBusSender {
    if (!this.senders.has(topic)) {
      const sender = this.serviceBusClient.createSender(topic);
      this.senders.set(topic, sender);
    }
    return this.senders.get(topic);
  }

  public sendThroughTopic<T extends unknown>(topic: string, eventType: string, body: T) {
    const sender = this.getSender(topic);
    const message: ServiceBusMessage = {body, applicationProperties: {eventType}}

    this.logger.log("Sending message to topic", topic, message)
    return sender.sendMessages(message);
  }

  async onModuleDestroy(): Promise<void> {
    for (const sender of this.senders.values()
      ) {
      await sender.close();
    }
    await this.serviceBusClient.close();
  }
}
