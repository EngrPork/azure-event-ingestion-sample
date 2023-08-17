import { AzureServiceBusSenderService } from '@azure-event-ingestion-sample/azure/service-bus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceCService {
  constructor(
    private readonly azureServiceBusSenderService: AzureServiceBusSenderService
  ) {}

  handleCreateApplicationEvent(event: any) {
    return this.azureServiceBusSenderService.sendThroughTopic(
      'service-c',
      'create-application',
      event
    );
  }
}
