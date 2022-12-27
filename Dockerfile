FROM node:19-alpine

WORKDIR /usr/app

COPY ./backend ./backend

COPY ./package.json .

COPY ./package-lock.json .

EXPOSE 8080

# There is an argument to be made whether the npm installs and builds should
# be done inside the container. For now it is easier to just copy the backend
# which already has the build_frontend and build_backend
RUN apk update

CMD ["npm", "--prefix", "./backend", "run", "start:backend"]