import { Injectable, Logger } from '@nestjs/common';
import {
  QueueHandler,
  QueueHandlerRegistryService,
} from '@azure-event-ingestion-sample/azure/service-bus';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Device } from '@azure-event-ingestion-sample/modules/device';

@Injectable()
export class CreateDeviceService implements QueueHandler {
  private readonly logger = new Logger(CreateDeviceService.name);

  readonly eventType = 'create-device';
  readonly queueName = 'service-b';

  constructor(
    private readonly queueHandlerRegistryService: QueueHandlerRegistryService,
    @InjectModel(Device.name) private deviceModel: Model<Device>
  ) {
    queueHandlerRegistryService.registerHandler('service-b', this);
  }

  async handleMessage(message: any): Promise<void> {
    console.log('Handling message', message);

    return this.deviceModel
      .create({
        ...message,
        title: 'device.' + Math.random().toString(36).substring(7),
      })
      .then((device) => {
        this.logger.log('Device created', device);
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }
}
