import { Test, TestingModule } from "@nestjs/testing";
import { AzureEventHubProducerService } from "./azure-event-hub-producer.service";

describe("AzureEventHubProducerService", () => {
  let service: AzureEventHubProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureEventHubProducerService]
    }).compile();

    service = module.get<AzureEventHubProducerService>(AzureEventHubProducerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
