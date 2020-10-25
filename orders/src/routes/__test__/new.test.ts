import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import {Order, OrderStatus} from '../../models/ordet'
import {Ticket} from '../../models/ticket';


it('returns an error if ticket not exist', async ()=>{
    const ticketId = mongoose.Types.ObjectId();
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId})
        .expect(404);
})

it('returns an error if ticket already reserved', async ()=>{
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();
    const order = Order.build({
        ticket,
        userId: 'wesasdwr',
        status: OrderStatus.Created,
        expiresAt: new Date()
    });
    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id}).expect(400);
})


it('succeed reverserving a ticket', async ()=>{
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    })
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id}).expect(201);

})

it.todo('emits an order created event');