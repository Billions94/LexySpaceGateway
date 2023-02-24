# Development
FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install
RUN npm install -g ts-node

RUN npm install graphql-redis-subscriptions

COPY . .

RUN ts-node generate-typings.ts
RUN npm run build

CMD ["npm", "run", "start:prod"]

