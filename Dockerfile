FROM node:19-alpine

WORKDIR /usr/app

COPY . .

EXPOSE 3000

RUN apk update && apk add redis \
    && cd frontend && npm install && cd ../backend && npm install serve -g \
    && npm install

CMD ["npm", "--prefix", "./backend", "run", "start"]