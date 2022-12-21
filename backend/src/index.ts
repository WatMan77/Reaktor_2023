import express from 'express'
import updateDroneData from './helpers/drone_helper'
import xmlparser from 'express-xml-bodyparser'
import cors from 'cors'
import { Server } from 'socket.io'
const app = express()
app.use(express.json())
app.use(xmlparser())
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

// Allow Cross-origin only for the front end
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

setInterval(() => {
  void updateDroneData(io)
}, 2000)
