import {ServiceBusMessage} from "@azure/service-bus";
import {IsNotEmpty, IsObject} from "class-validator";

export class BaseMessageDto<T = unknown> implements ServiceBusMessage {
  @IsNotEmpty()
  body: T;

  @IsNotEmpty()
  @IsObject()
  applicationProperties: {
    eventType: string;
  }
}
