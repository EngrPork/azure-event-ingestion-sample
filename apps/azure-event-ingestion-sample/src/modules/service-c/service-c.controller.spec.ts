import { Test, TestingModule } from '@nestjs/testing';
import { ServiceCController } from './service-c.controller';
import { ServiceCService } from './service-c.service';

describe('ServiceCController', () => {
  let controller: ServiceCController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceCController],
      providers: [ServiceCService],
    }).compile();

    controller = module.get<ServiceCController>(ServiceCController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
