import { Server, Socket } from 'socket.io';
import connectRabbitMQ from './rabbitmq';

require('dotenv').config();

const io = new Server(Number(process.env.PORT) || 3003);

const clientsIds: Array<string> = [];

io.on('connection', (socket: Socket) => {
  clientsIds.push(socket.id);

  connectRabbitMQ(socket, clientsIds);
});
