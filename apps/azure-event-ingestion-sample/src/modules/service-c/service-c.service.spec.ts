import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCService } from './service-c.service';

describe('ServiceCService', () => {
  let service: ServiceCService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceCService],
    }).compile();

    service = module.get<ServiceCService>(ServiceCService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
