FROM node:10

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

ADD . .

EXPOSE 4000

CMD [ "node", "server.js"]