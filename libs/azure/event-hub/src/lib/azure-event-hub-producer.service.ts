import {EventHubProducerClient} from "@azure/event-hubs";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {from, tap} from "rxjs";

@Injectable()
export class AzureEventHubProducerService {
  private producerClient: EventHubProducerClient;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.producerClient = new EventHubProducerClient(
      configService.get<string>("EVENT_HUB_CONNECTION_STRING")
    );
  }

  sendMessage(body: Record<string, unknown>) {
    console.log("Sending message to event hub");
    return from(this.producerClient.sendBatch([{body}])).pipe(
      tap(() => console.log("Message sent to event hub"))
    );
  }
}
