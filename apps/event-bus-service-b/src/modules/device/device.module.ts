import {
  Device,
  DeviceSchema,
} from '@azure-event-ingestion-sample/modules/device';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateDeviceService } from './services/create-device.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  providers: [CreateDeviceService],
})
export class DeviceModule {}
