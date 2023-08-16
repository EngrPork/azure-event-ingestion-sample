import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "../config/database/database.module";
import {CoreModule} from "@azure-event-ingestion-sample/core";
import {UserModule} from "../modules/user/user.module";
import {ServiceBusModule} from "../modules/service-bus/service-bus.module";


@Module({
  imports: [CoreModule, DatabaseModule, ServiceBusModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
