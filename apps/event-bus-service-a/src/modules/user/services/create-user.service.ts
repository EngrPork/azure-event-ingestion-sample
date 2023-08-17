import {Injectable} from "@nestjs/common";
import {QueueHandler, QueueHandlerRegistryService} from "@azure-event-ingestion-sample/azure/service-bus";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "@azure-event-ingestion-sample/modules/user";
import {Model} from "mongoose";


@Injectable()
export class CreateUserService implements QueueHandler {
  readonly eventType = "create"
  readonly queueName = "service-a"

  constructor(private readonly queueHandlerRegistryService: QueueHandlerRegistryService, @InjectModel(User.name) private catModel: Model<User>) {
    queueHandlerRegistryService.registerHandler("service-a", this)
  }

  handleMessage(message: any): Promise<void> {
    console.log("Handling message", message)
    return Promise.resolve()
  }
}
