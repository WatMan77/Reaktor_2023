import { createClient } from 'redis'
const redisClient = createClient({
  socket: {
    port: 6379,
    host: process.env.REDIS_HOST ?? 'redis'
  }
})

redisClient.on('error', (e) => {
  console.error('Error connecting to redis')
  console.error(e)
})

// Wish I knew how to make top level
console.log('What about redis?')
console.log(redisClient.isReady)
console.log(redisClient.isOpen)

export { redisClient }
