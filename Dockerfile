FROM node:18-alpine

WORKDIR /home/app

COPY . ./

RUN yarn install

EXPOSE 3333

CMD ["yarn", "dev"]