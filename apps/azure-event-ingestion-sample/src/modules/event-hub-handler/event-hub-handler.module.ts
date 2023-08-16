import {Module, OnModuleInit} from '@nestjs/common';
import {EventHubHandlerService} from './event-hub-handler.service';
import {EventHubHandlerController} from './event-hub-handler.controller';
import {
  AzureEventHubModule,
  AzureEventHubProducerService,
  EventHandlerRegistryService
} from "@azure-event-ingestion-sample/azure/event-hub";

@Module({
  imports: [AzureEventHubModule],
  controllers: [EventHubHandlerController],
  providers: [EventHubHandlerService, AzureEventHubProducerService],
})
export class EventHubHandlerModule {

}
