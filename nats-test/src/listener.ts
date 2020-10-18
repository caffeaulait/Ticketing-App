import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listenner connected to NATS');

  stan.on('close', () => {
    console.log('Connection closed');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('order-service');

  const subscripton = stan.subscribe(
    'ticket:created',
    'orderQueueGroup',
    options
  );

  subscripton.on('message', (msg: Message) => {
    const data = msg.getData();
    if (typeof data === 'string') {
      console.log(`Received Event #${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();
  });
});

process.on('SIGINT', () => {
  stan.close();
});
process.on('SIGTERM', () => {
  stan.close();
});
