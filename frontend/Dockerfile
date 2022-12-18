FROM node:19-bullseye

COPY . .

EXPOSE 3000

RUN apt update && npm install

CMD ["npm", "run", "start"]