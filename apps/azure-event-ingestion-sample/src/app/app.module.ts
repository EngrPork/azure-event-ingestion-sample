import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@azure-event-ingestion-sample/core';
import { EventHubHandlerModule } from '../modules/event-hub-handler/event-hub-handler.module';
import { ServiceAModule } from '../modules/service-a/service-a.module';
import { AzureServiceBusModule } from '@azure-event-ingestion-sample/azure/service-bus';
import { ServiceBModule } from '../modules/service-b/service-b.module';
import { ServiceCModule } from '../modules/service-c/service-c.module';

@Module({
  imports: [
    CoreModule,
    AzureServiceBusModule.forRoot(),
    EventHubHandlerModule,
    ServiceAModule,
    ServiceBModule,
    ServiceCModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
