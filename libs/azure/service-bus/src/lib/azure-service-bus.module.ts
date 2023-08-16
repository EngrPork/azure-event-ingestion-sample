import {DynamicModule, Global, Module} from '@nestjs/common';
import {ServiceBusClient} from "@azure/service-bus";
import {ConfigService} from "@nestjs/config";
import {AzureServiceBusReceiverService} from "./azure-service-bus-receiver.service";
import {AzureServiceBusSenderService} from "./azure-service-bus-sender.service";
import {AZURE_SERVICE_BUS_CLIENT} from "./constants";
import {QueueHandlerRegistryService} from "./queue-handler-registry.service";

@Module({
  providers: [AzureServiceBusReceiverService, AzureServiceBusSenderService, QueueHandlerRegistryService],
  exports: [AzureServiceBusReceiverService, AzureServiceBusSenderService, QueueHandlerRegistryService],
})
@Global()
export class AzureServiceBusModule {
  static forRoot(options?: Partial<{ connectionString: string, }>): DynamicModule {
    return {
      module: AzureServiceBusModule,
      providers: [{
        provide: AZURE_SERVICE_BUS_CLIENT,
        useFactory: async (configService: ConfigService) => {
          return new ServiceBusClient(configService.get<string>('SERVICE_BUS_CONNECTION_STRING'));
        },
        inject: [ConfigService],
      },],
      exports: [AZURE_SERVICE_BUS_CLIENT],
    };
  }
}
