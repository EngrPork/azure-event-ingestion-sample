import { AzureServiceBusSenderService } from '@azure-event-ingestion-sample/azure/service-bus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceBService {
  constructor(
    private readonly azureServiceBusSenderService: AzureServiceBusSenderService
  ) {}

  handleCreateDeviceEvent(event: any) {
    return this.azureServiceBusSenderService.sendThroughTopic(
      'service-b',
      'create-device',
      event
    );
  }
}
