import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "../config/database/database.module";
import {CoreModule} from "@azure-event-ingestion-sample/core";

@Module({
  imports: [CoreModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
