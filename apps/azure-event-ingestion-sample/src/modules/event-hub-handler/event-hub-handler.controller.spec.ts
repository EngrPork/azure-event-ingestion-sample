import { Test, TestingModule } from '@nestjs/testing';
import { EventHubHandlerController } from './event-hub-handler.controller';
import { EventHubHandlerService } from './event-hub-handler.service';

describe('EventHubHandlerController', () => {
  let controller: EventHubHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventHubHandlerController],
      providers: [EventHubHandlerService],
    }).compile();

    controller = module.get<EventHubHandlerController>(
      EventHubHandlerController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
