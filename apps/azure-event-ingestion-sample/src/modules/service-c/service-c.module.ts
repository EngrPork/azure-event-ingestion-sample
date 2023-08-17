import { Module, OnModuleInit } from '@nestjs/common';
import { ServiceCService } from './service-c.service';
import { ServiceCController } from './service-c.controller';
import { EventHandlerRegistryService } from '@azure-event-ingestion-sample/azure/event-hub';

@Module({
  controllers: [ServiceCController],
  providers: [ServiceCService],
})
export class ServiceCModule implements OnModuleInit {
  constructor(
    private readonly eventHandlerRegistryService: EventHandlerRegistryService,
    private readonly serviceCService: ServiceCService
  ) {}
  onModuleInit() {
    this.eventHandlerRegistryService.registerHandler(
      'create-application',
      this.serviceCService.handleCreateApplicationEvent.bind(
        this.serviceCService
      )
    );
  }
}
