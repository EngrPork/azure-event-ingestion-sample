import { Module, OnModuleInit } from '@nestjs/common';
import { ServiceBService } from './service-b.service';
import { ServiceBController } from './service-b.controller';
import { EventHandlerRegistryService } from '@azure-event-ingestion-sample/azure/event-hub';

@Module({
  controllers: [ServiceBController],
  providers: [ServiceBService],
})
export class ServiceBModule implements OnModuleInit {
  constructor(
    private readonly eventHandlerRegistryService: EventHandlerRegistryService,
    private readonly serviceBService: ServiceBService
  ) {}
  onModuleInit() {
    this.eventHandlerRegistryService.registerHandler(
      'create-device',
      this.serviceBService.handleCreateDeviceEvent.bind(this.serviceBService)
    );
  }
}
