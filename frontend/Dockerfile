FROM node:19-alpine

COPY . .

EXPOSE 3000

RUN apk update && npm install && npm run build && npm install -g serve

CMD ["serve", "-s", "build"]