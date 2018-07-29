FROM node:8

WORKDIR /usr/src/app

COPY . .

RUN yarn install

CMD yarn start
