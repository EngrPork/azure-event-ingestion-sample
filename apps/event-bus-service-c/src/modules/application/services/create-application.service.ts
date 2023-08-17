import { Injectable, Logger } from '@nestjs/common';
import {
  QueueHandler,
  QueueHandlerRegistryService,
} from '@azure-event-ingestion-sample/azure/service-bus';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Application } from '@azure-event-ingestion-sample/modules/application';

@Injectable()
export class CreateApplicationService implements QueueHandler {
  private readonly logger = new Logger(CreateApplicationService.name);

  readonly eventType = 'create-application';
  readonly queueName = 'service-b';

  constructor(
    private readonly queueHandlerRegistryService: QueueHandlerRegistryService,
    @InjectModel(Application.name) private applicationModel: Model<Application>
  ) {
    queueHandlerRegistryService.registerHandler('service-b', this);
  }

  async handleMessage(message: any): Promise<void> {
    console.log('Handling message', message);

    return this.applicationModel
      .create({
        ...message,
        title: 'application.' + Math.random().toString(36).substring(7),
      })
      .then((application) => {
        this.logger.log('Application created', application);
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }
}
