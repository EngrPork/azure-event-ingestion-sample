import {Injectable} from '@nestjs/common';
import {
  AzureEventHubProducerService,
  AzureEventHubService,
  EventHandlerRegistryService
} from "@azure-event-ingestion-sample/azure/event-hub";

@Injectable()
export class EventHubHandlerService {
  constructor(
    private readonly azureEventHubProducerService: AzureEventHubProducerService,
  ) {
  }
  emitHttpToEventHub(body: any) {
    this.azureEventHubProducerService.sendMessage(body);
  }
}
