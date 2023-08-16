export interface QueueHandler {
  queueName: string;
  eventType: string;

  handleMessage(message: any): Promise<void>;
}

export class QueueHandler implements QueueHandler {
  queueName: string;
  eventType: string;

  handleMessage(message: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
