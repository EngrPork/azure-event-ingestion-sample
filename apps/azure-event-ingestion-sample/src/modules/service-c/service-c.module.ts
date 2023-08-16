import { Module } from '@nestjs/common';
import { ServiceCService } from './service-c.service';
import { ServiceCController } from './service-c.controller';

@Module({
  controllers: [ServiceCController],
  providers: [ServiceCService],
})
export class ServiceCModule {}
