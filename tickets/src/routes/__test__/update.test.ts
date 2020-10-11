import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

it('returns 404 if provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'changed',
      price: 20,
    })
    .expect(404);
});

it('returns 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'changed',
      price: 20,
    })
    .expect(401);
});

it('returns 401 if user does not own the ticcket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'created',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'changed',
      price: 111,
    })
    .expect(401);
});

it('returns 400 if user provides invalid title or price', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'created',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      titlee: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      titlee: 'changed',
      price: -10,
    })
    .expect(400);
});

it('updates the ticket provided valid input', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'created',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100,
    })
    .expect(200);

  const ticketRes = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketRes.body.title).toEqual('new title');
  expect(ticketRes.body.price).toEqual(100);
});
