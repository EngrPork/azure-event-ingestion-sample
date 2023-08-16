import {Module} from '@nestjs/common';
import {AzureServiceBusModule, QueueHandlerRegistryService} from "@azure-event-ingestion-sample/azure/service-bus";
import {QueueHandler} from "../../../../../libs/azure/service-bus/src/lib/interface/queue-handler.interface";

@Module({
  imports: [
    AzureServiceBusModule.forRoot()
  ]
})
export class ServiceBusModule {
  constructor(private readonly queueHandlerRegistryService: QueueHandlerRegistryService) {
    queueHandlerRegistryService.registerHandler("service-a", new QueueHandler())
  }
}
