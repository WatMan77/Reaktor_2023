import { createClient, RedisClientType } from 'redis'

// Depending on whether we are running in the docker or not, the host is different
let redisClient: RedisClientType;

if (process.env.REDIS_HOST) {

  redisClient = createClient({
    socket: {
      port: 6379,
      host: process.env.REDIS_HOST
    }
  })
} else {
  console.log('Nothing special')
  redisClient = createClient()
}

redisClient.on('error', (e) => {
  console.error('Error connecting to redis')
  console.error(e)
})

export { redisClient }
