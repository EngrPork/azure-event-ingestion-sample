import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { EventHubConsumerClient } from '@azure/event-hubs';
import { ConfigService } from '@nestjs/config';
import { EventHandlerRegistryService } from './event-handler-registry.service';

@Injectable()
export class AzureEventHubService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AzureEventHubService.name);
  private consumerClient: EventHubConsumerClient;

  constructor(
    readonly configService: ConfigService,
    private readonly eventHandlerRegistryService: EventHandlerRegistryService
  ) {
    this.consumerClient = new EventHubConsumerClient(
      configService.get<string>('EVENT_HUB_CONSUMER_GROUP'),
      configService.get<string>('EVENT_HUB_CONNECTION_STRING')
    );
  }

  onModuleInit() {
    this.initialize();
  }

  async onModuleDestroy(): Promise<void> {
    await this.consumerClient.close();
    this.logger.log('Event Hub ingestion stopped.');
  }

  private initialize() {
    this.consumerClient.subscribe({
      processEvents: async (events, context) => {
        this.logger.log(
          `Available event handlers:`,
          this.eventHandlerRegistryService.getAllEventTypes()
        );
        for (const event of events) {
          this.logger.log(`Received event:`, event.body);
          this.logger.log(`Event type:`, event);
          const eventType = event.properties.eventType;

          if (
            this.eventHandlerRegistryService
              .getAllEventTypes()
              .includes(eventType)
          ) {
            this.eventHandlerRegistryService.triggerHandler(
              eventType,
              event.body
            );
          }
        }
      },
      processError: async (err, context) => {
        this.logger.error(`Error:`, err);
      },
    });
    this.logger.log('Event Hub ingestion started.');
  }
}
