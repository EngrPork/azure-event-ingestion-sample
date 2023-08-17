import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../config/database/database.module';
import { CoreModule } from '@azure-event-ingestion-sample/core';
import { ApplicationModule } from '../modules/application/application.module';
import { AzureServiceBusModule } from '@azure-event-ingestion-sample/azure/service-bus';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    AzureServiceBusModule.forRoot(),
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
