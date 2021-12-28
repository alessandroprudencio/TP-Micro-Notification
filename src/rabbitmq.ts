import * as amqp from 'amqplib';
import { ConsumeMessage } from 'amqplib';
import fetch from 'node-fetch';
import { INotification } from './interfaces/notification.interface';
import logger from './logger';
import { getMessage } from './notifications';

async function connectRabbitMQ() {
  try {
    const conn = await amqp.connect({
      hostname: process.env.RABBIT_MQ_HOST,
      port: Number(process.env.RABBIT_MQ_PORT),
      username: process.env.RABBIT_MQ_USERNAME,
      password: process.env.RABBIT_MQ_PASSWORD,
      vhost: process.env.RABBIT_MQ_VHOST,
    });

    const ch = await conn.createChannel();

    const queue = 'micro-notification-back';

    ch.assertQueue(queue);

    logger.info('Waiting for messages in %s.', queue);

    ch.consume(queue, (msg: ConsumeMessage | null) => proccessMessage(msg), { noAck: true });
  } catch (error) {
    logger.error(error.message);
  }
}

async function proccessMessage(msg: ConsumeMessage | null) {
  try {
    const { pattern, data } = JSON.parse(msg.content.toString());

    let message: INotification;

    if (pattern) message = getMessage(data);

    console.log('message=>', message);

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    throw error;
  }
}

export default connectRabbitMQ;
