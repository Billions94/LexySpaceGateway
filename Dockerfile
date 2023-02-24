# Development
FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development
RUN npm install -g ts-node

COPY . .

RUN ts-node generate-typings.ts
RUN npm run build

CMD ["npm", "run", "start:prod"]

