export interface QueueHandler {
  queueName: string;
  eventType: string;

  handleMessage(message: any): Promise<void>;
}
