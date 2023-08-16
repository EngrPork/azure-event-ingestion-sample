import {Body, Controller, Post} from '@nestjs/common';
import {EventHubHandlerService} from './event-hub-handler.service';

@Controller('event-hub-handler')
export class EventHubHandlerController {
  constructor(
    private readonly eventHubHandlerService: EventHubHandlerService
  ) {
  }

  /**
   * This endpoint is used to emit an event to the event hub.
   * For Testing purposes only.
   * @param body
   */
  @Post()
  emitHttpToEventHub(@Body() body: any) {
    return this.eventHubHandlerService.emitHttpToEventHub(body);
  }
}
