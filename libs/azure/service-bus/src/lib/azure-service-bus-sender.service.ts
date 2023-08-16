import {Inject, Injectable, Logger, OnModuleDestroy} from '@nestjs/common';
import {AZURE_SERVICE_BUS_CLIENT} from "./constants";
import {ServiceBusClient, ServiceBusSender} from "@azure/service-bus";

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

  public sendThroughTopic<T>(topic: string, message: T) {
    const sender = this.getSender(topic);
    console.log("Sending message to topic", topic, message)
    return sender.sendMessages({
      body: message
    });
  }

  async onModuleDestroy(): Promise<void> {
    for (const sender of this.senders.values()) {
      await sender.close();
    }
    await this.serviceBusClient.close();
  }
}
