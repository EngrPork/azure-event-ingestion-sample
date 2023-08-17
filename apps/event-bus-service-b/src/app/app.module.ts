import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../config/database/database.module';
import { CoreModule } from '@azure-event-ingestion-sample/core';
import { AzureServiceBusModule } from '@azure-event-ingestion-sample/azure/service-bus';
import { DeviceModule } from '../modules/device/device.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    AzureServiceBusModule.forRoot(),
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
