import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@yangsworld/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName: string = queueGroupName;

  async onMessage(
    data: {
      id: string;
      status: OrderStatus;
      userId: string;
      version: number;
      expiresAt: string;
      ticket: { id: string; price: number };
    },
    msg: Message
  ) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();
    msg.ack();
  }
}
