import {Global, Module} from '@nestjs/common';
import {AzureEventHubService} from "./service/azure-event-hub.service";
import {EventHandlerRegistryService} from "./service/event-handler-registry.service";


@Module({
  providers: [AzureEventHubService, EventHandlerRegistryService],
  exports: [AzureEventHubService, EventHandlerRegistryService],
})
@Global()
export class AzureEventHubModule {
}
