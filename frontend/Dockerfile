FROM node:19-bullseye

COPY . .

EXPOSE 3000

RUN apt update && npm install && npm run build && npm install -g serve

CMD ["serve", "-s", "build"]