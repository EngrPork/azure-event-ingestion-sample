import {Injectable} from '@nestjs/common';
import {AzureServiceBusSenderService} from "@azure-event-ingestion-sample/azure/service-bus";

@Injectable()
export class ServiceAService {
  constructor(
    private readonly azureServiceBusSenderService: AzureServiceBusSenderService) {
  }

  handleCreateUserEvent(event: any) {
    return this.azureServiceBusSenderService.sendThroughTopic("service-a", "create", event)
  }
}
