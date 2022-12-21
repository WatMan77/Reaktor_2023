FROM node:19-alpine

WORKDIR /usr/app

COPY . .

EXPOSE 8080

RUN apk update && npm install && npm run tsc && cd build && ls

CMD ["npm", "run", "start"]