FROM node:19-bullseye

COPY . .

RUN apt update && npm install

CMD ["npm", "run", "dev"]