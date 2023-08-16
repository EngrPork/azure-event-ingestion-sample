import {Module} from '@nestjs/common';
import {ServiceAService} from './service-a.service';
import {ServiceAController} from './service-a.controller';
import {EventHandlerRegistryService} from "@azure-event-ingestion-sample/azure/event-hub";
import {AzureServiceBusModule, AzureServiceBusSenderService} from "@azure-event-ingestion-sample/azure/service-bus";

@Module({
  imports: [],
  controllers: [ServiceAController],
  providers: [ServiceAService],
})
export class ServiceAModule {
  constructor(private readonly eventHandlerRegistryService: EventHandlerRegistryService, private readonly azureServiceBusSenderService: AzureServiceBusSenderService) {
    eventHandlerRegistryService.registerHandler('service-a', (event) => {
      return azureServiceBusSenderService.sendThroughTopic("service-a", event)
    })
  }
}
