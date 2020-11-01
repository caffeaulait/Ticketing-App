import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@yangsworld/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';
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
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(`waiting for ${delay} milliseconds to prodess the job`);
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: delay,
      }
    );

    msg.ack();
  }
}
