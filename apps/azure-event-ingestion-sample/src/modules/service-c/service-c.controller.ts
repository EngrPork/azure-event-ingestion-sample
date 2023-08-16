import { Controller } from '@nestjs/common';
import { ServiceCService } from './service-c.service';

@Controller()
export class ServiceCController {
  constructor(private readonly serviceCService: ServiceCService) {}
}
