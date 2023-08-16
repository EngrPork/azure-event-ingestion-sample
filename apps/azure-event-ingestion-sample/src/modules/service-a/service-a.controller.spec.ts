import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';

describe('ServiceAController', () => {
  let controller: ServiceAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAController],
      providers: [ServiceAService],
    }).compile();

    controller = module.get<ServiceAController>(ServiceAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
