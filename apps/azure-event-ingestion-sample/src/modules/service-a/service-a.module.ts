import {Module, OnModuleInit} from '@nestjs/common';
import {ServiceAService} from './service-a.service';
import {ServiceAController} from './service-a.controller';
import {EventHandlerRegistryService} from "@azure-event-ingestion-sample/azure/event-hub";

@Module({
  imports: [],
  controllers: [ServiceAController],
  providers: [ServiceAService],
})
export class ServiceAModule implements OnModuleInit {
  constructor(private readonly eventHandlerRegistryService: EventHandlerRegistryService, private readonly serviceAService: ServiceAService) {
  }
  onModuleInit() {
    this.eventHandlerRegistryService.registerHandler('service-a', this.serviceAService.handleCreateUserEvent.bind(this.serviceAService))
  }
}
