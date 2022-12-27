FROM node:19-alpine

WORKDIR /usr/app

COPY ./backend ./backend

COPY ./package.json .

COPY ./package-lock.json .

RUN echo "HERE IS LS!" && ls

EXPOSE 3000

#RUN apk update && apk add redis \
#    && cd frontend && npm install && cd ../backend && npm install serve -g \
#    && npm install

RUN apk update && apk add redis && npm install serve -g

#CMD ["npm", "--prefix", "./backend", "run", "start"]

CMD ["npm", "run", "start"]