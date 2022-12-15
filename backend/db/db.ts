import { createClient } from "redis";
const redisClient = createClient({
    socket: {
        port: 6379,
        host: process.env.REDIS_HOST || "redis"
    }
});

redisClient.on("error", (e) => {
    console.error("Error connecting to redis");
    console.error(e);
});

redisClient.connect().then(() => {
    redisClient.setEx('photos', 3600, "moi");

});

export { redisClient };