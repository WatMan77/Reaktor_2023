FROM node:19-alpine

WORKDIR /usr/app

COPY ./backend ./backend

COPY ./frontend ./frontend

COPY ./package.json .

COPY ./package-lock.json .

EXPOSE 8080

# Build the app and remove frontend folder as it is not needed
RUN apk update && \
    cd frontend && \
    npm install && \
    cd ../backend && \
    npm install && \
    npm run build:full && \
    rm -rf ../frontend

CMD ["npm", "--prefix", "./backend", "run", "start:backend"]