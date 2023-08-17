import { EventData, EventHubProducerClient } from '@azure/event-hubs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { from, tap } from 'rxjs';

@Injectable()
export class AzureEventHubProducerService {
  private readonly logger = new Logger(AzureEventHubProducerService.name);
  private producerClient: EventHubProducerClient;

  constructor(private readonly configService: ConfigService) {
    this.producerClient = new EventHubProducerClient(
      configService.get<string>('EVENT_HUB_CONNECTION_STRING')
    );
  }

  sendMessage(body: Record<string, unknown>) {
    const { eventType, ...rest } = body;
    const payload: EventData = {
      body: rest,
      properties: {
        eventType,
      },
    };

    this.logger.log('Sending message to event hub');
    return from(this.producerClient.sendBatch([payload])).pipe(
      tap(() => this.logger.log('Message sent to event hub'))
    );
  }
}
