import express from 'express'
import 'express-async-errors'
import updateDroneData from './helpers/drone_helper'
import cors from 'cors'
import { Server } from 'socket.io'
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT ?? 8080

// Leaving one pong for now in case something goes wrong with connections
app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Allow Cross-origin only for the frontend
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

// Every 2 seconds, fetch data for the drones and update the cache
setInterval(() => {
  void updateDroneData(io)
}, 2000)
