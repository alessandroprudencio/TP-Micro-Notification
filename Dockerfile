FROM node:16-alpine

RUN apk add --no-cache bash

WORKDIR /usr/tennis-player/tp-micro-notification

COPY . .

RUN yarn

CMD ["yarn", "run", "start:dev"]   