FROM node:19-slim

WORKDIR /home/node/app

ENV NODE_ENV=development
ENV PORT=3002
ENV DATABASE_URL=mysql://root:root@localhost:3306/finance_me


COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]