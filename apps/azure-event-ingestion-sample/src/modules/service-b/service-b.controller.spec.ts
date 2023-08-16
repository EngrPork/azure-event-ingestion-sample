import { Test, TestingModule } from '@nestjs/testing';
import { ServiceBController } from './service-b.controller';
import { ServiceBService } from './service-b.service';

describe('ServiceBController', () => {
  let controller: ServiceBController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceBController],
      providers: [ServiceBService],
    }).compile();

    controller = module.get<ServiceBController>(ServiceBController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
