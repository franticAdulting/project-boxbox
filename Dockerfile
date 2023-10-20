FROM node:19

WORKDIR /server

COPY package.json .
COPY yarn.lock .

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN yarn install

RUN npx prisma generate

EXPOSE 4000

CMD yarn start:prod