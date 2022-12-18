import express from 'express'
import { routes } from './route'
import updateDroneData from './helper/drone_helper'
// import * as xmlparser from "express-xml-bodyparser";
import xmlparser from 'express-xml-bodyparser'
// import cors from 'cors'
import { Server } from 'socket.io'
const app = express()
app.use(express.json())
app.use(xmlparser())
// app.use(cors())
app.use('/', routes)

const PORT = process.env.PORT ?? 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
console.log(server)

const io = new Server(server)

io.on('connection', (socket) => {
  socket.emit('hello', 'world')
})

setInterval(() => {
  console.log('INTERVAL UPDATE!')
  void updateDroneData(io)
}, 2000)
