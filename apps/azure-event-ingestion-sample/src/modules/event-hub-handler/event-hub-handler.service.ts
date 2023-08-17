import {Injectable} from '@nestjs/common';
import {AzureEventHubProducerService} from "@azure-event-ingestion-sample/azure/event-hub";

@Injectable()
export class EventHubHandlerService {
  constructor(
    private readonly azureEventHubProducerService: AzureEventHubProducerService,
  ) {
  }

  emitHttpToEventHub(body: Record<string, unknown>) {
    this.azureEventHubProducerService.sendMessage(body);
  }
}
