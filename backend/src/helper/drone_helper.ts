import { DroneData, PilotInfo } from '../../types'
import { redisClient } from '../db/db'
import parser from 'xml-js'
import { Server } from 'socket.io'

// Get the drone data and parse the XML to an Object
const fetchDroneData = async (): Promise<DroneData[]> => {
  const response = await fetch('https://assignments.reaktor.com/birdnest/drones')
  const drones = await response.text()
  const data = JSON.parse(parser.xml2json(drones, { compact: true, spaces: 4 }))
  return data.report.capture.drone
}

// Calculates the distance of the drone inside the zone
const calculateDistance = (drone: DroneData): number => {
  // The distances are constants
  // Origin at 250000, 250000
  // X and Y positions between 0 - 500000
  const x = 250000; const y = 250000
  const xDrone: number = +drone.positionX._text
  const yDrone: number = +drone.positionY._text
  const xDistance = Math.pow(x - xDrone, 2)
  const yDistance = Math.pow(y - yDrone, 2)

  const distance = Math.sqrt(xDistance + yDistance)

  // Return the data in meters
  return distance / 1000
}

const emitPilotInfo = async (io: Server): Promise<void> => {
  const keys = await redisClient.keys('*')

  const pilots: PilotInfo[] = []

  for (const key of keys) {
    const pilot = await redisClient.get(key)
    if (pilot !== null) {
      pilots.push(JSON.parse(pilot))
    }
  }
  io.emit('pilotInfo', pilots)
}

const updateDroneData = async (io: Server): Promise<void> => {
  if (!redisClient.isReady) {
    await redisClient.connect()
  }
  const droneData = await fetchDroneData()
  const violatingDrones: DroneData[] = []
  droneData.forEach(d => {
    const distance = calculateDistance(d)
    if (distance <= 100) {
      d.distanceToNest = distance
      console.log('Pushing', d)
      violatingDrones.push(d)
    }
  })

  for (const drone of violatingDrones) {
    const response = await fetch('https://assignments.reaktor.com/birdnest/pilots/' + drone.serialNumber._text)
    // There might be an error 404 or similar. Making sure we don't
    // try to access invalid data
    if (response.status === 200) {
      // Save the information in text and save it in the Redis cache
      const text = await response.text()
      const pilotInfo: PilotInfo = JSON.parse(text)
      pilotInfo.distanceToNest = drone.distanceToNest
      await redisClient.setEx(pilotInfo.pilotId, 600, JSON.stringify(pilotInfo))
    }
  }
  // Send the violators to the client(s) using a socket
  await emitPilotInfo(io)
}

export default updateDroneData
