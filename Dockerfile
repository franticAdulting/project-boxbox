FROM node:16-slim AS development
ENV NODE_ENV development

WORKDIR /server

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]