import { Injectable, Logger } from '@nestjs/common';
import {
  QueueHandler,
  QueueHandlerRegistryService,
} from '@azure-event-ingestion-sample/azure/service-bus';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@azure-event-ingestion-sample/modules/user';
import { Model } from 'mongoose';

@Injectable()
export class CreateUserService implements QueueHandler {
  private readonly logger = new Logger(CreateUserService.name);

  readonly eventType = 'create-user';
  readonly queueName = 'service-a';

  constructor(
    private readonly queueHandlerRegistryService: QueueHandlerRegistryService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {
    queueHandlerRegistryService.registerHandler('service-a', this);
  }

  async handleMessage(message: any): Promise<void> {
    console.log('Handling message', message);

    return this.userModel
      .create({
        ...message,
        name: 'user.' + Math.random().toString(36).substring(7),
      })
      .then((user) => {
        this.logger.log('User created', user);
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }
}
