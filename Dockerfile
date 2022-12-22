FROM docker:dind

WORKDIR /usr/app

COPY . .

EXPOSE 5000

RUN apk update

RUN docker -v

#CMD ["docker-compose", "up"]