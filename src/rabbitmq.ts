import * as amqp from 'amqplib';
import { Socket } from 'socket.io';

async function connectRabbitMQ(socket: Socket, clientsIds: Array<string>) {
  try {
    const conn = await amqp.connect(process.env.RABBIT_MQ_CONNECTION);

    const ch = await conn.createChannel();

    const queue = process.env.RABBIT_MQ_QUEUE;

    console.log('id connection=>', clientsIds);

    ch.assertQueue(queue);

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    ch.consume(queue, (msg) => proccessMessage(msg, socket), { noAck: true });
  } catch (error) {
    throw error;
  }
}

function proccessMessage(msg: amqp.ConsumeMessage, socket: Socket) {
  const { pattern, data } = JSON.parse(msg.content.toString());

  if (pattern && pattern === 'create-notification-challenge') {
    socket.emit('notification-challenge', data);
  }
}

export default connectRabbitMQ;
