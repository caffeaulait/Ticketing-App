import { OrderStatus } from '@yangsworld/common';
import request from 'supertest';
import app from '../../app';
import { Order } from '../../models/ordet';
import { Ticket } from '../../models/ticket';

it('marks an order as cancelled', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const cancelledOrder = await Order.findById(order.id);

  expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo('emits an order cancelled event');
