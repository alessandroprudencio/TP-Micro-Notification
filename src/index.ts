import logger from './logger';
import connectRabbitMQ from './rabbitmq';

require('dotenv').config();

logger.info('Notifications microservices successfully started !');

connectRabbitMQ();
