import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CoreModule} from "@azure-event-ingestion-sample/core";
import {EventHubHandlerModule} from "../modules/event-hub-handler/event-hub-handler.module";
import {ServiceAModule} from "../modules/service-a/service-a.module";
import {AzureServiceBusModule} from "@azure-event-ingestion-sample/azure/service-bus";

@Module({
  imports: [CoreModule, AzureServiceBusModule.forRoot(), EventHubHandlerModule, ServiceAModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
