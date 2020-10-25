import { Publisher, OrderCreatedEvent, Subjects } from '@yangsworld/common';

export class OrderCreatedPublihser extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
