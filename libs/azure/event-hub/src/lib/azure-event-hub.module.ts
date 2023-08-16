import {Global, Module} from '@nestjs/common';
import {AzureEventHubService} from "./azure-event-hub.service";
import {EventHandlerRegistryService} from "./event-handler-registry.service";

@Module({
  providers: [AzureEventHubService, EventHandlerRegistryService],
  exports: [AzureEventHubService, EventHandlerRegistryService],
})
@Global()
export class AzureEventHubModule {
}
