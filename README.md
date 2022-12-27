# Reaktor 2023 summer trainee pre-assignment

This app shows the drones that in the past 10 minutes have flown within 100 meters
of a (fictional) bird nesting area.

The application uses node/express as a backend and React in the frontend. THe backend polls the
data of the drones every 2 seconds and calculates whether the drones have violated the 100 meter rule.
If they have, their data is saved for 10 minutes inside a Redis cache.

The client and the server are connected using Sockets (Socket.IO). The backend emits the data from the
redis cache to the clients updating the client site in real time.

The application can also be found running here: https://crimson-thunder-9580.fly.dev/

# How to run the application locally
To run the application locally, you can just use docker-compose up which then builds the frontend and backend.

## Development locally
For backend dev: run 'redis-server' in the terminal and then 'npm run dev'. For frontend: 'npm run start'

The Dockerfile in the root is for deployment only