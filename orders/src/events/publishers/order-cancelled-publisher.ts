import { Publisher, OrderCancelledEvent, Subjects } from '@yangsworld/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
