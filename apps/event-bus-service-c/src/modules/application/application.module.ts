import {
  Application,
  ApplicationSchema,
} from '@azure-event-ingestion-sample/modules/application';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateApplicationService } from './services/create-application.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
  ],
  providers: [CreateApplicationService],
})
export class ApplicationModule {}
