import { createClient, RedisClientType } from 'redis'

// Depending on whether we are running in the docker or not, the host is different
let redisClient: RedisClientType;

if (process.env.REDIS_HOST) {

  console.log('Development redis cache')
  redisClient = createClient({
    socket: {
      port: 6379,
      host: process.env.REDIS_HOST
    }
  })
} else if (process.env.REDIS_URL) {
  console.log('Connect tospecific REDIS URL')
  redisClient = createClient({ url: process.env.REDIS_URL })
} else {
  console.log('Basic REDIS client')
  redisClient = createClient()
}

redisClient.on('error', (e) => {
  console.error('Error connecting to redis')
  console.error(e)
})

export { redisClient }
