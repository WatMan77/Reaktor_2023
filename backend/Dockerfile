FROM node:19-bullseye

COPY . .

EXPOSE 8080

RUN apt update && npm install

CMD ["npm", "run", "dev"]