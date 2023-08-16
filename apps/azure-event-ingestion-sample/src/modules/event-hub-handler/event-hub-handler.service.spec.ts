import { Test, TestingModule } from '@nestjs/testing';
import { EventHubHandlerService } from './event-hub-handler.service';

describe('EventHubHandlerService', () => {
  let service: EventHubHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventHubHandlerService],
    }).compile();

    service = module.get<EventHubHandlerService>(EventHubHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
