import { DroneData, PilotInfo } from '../types/drone'
import { redisClient } from '../db/db'
import parser from 'xml-js'

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

const updateDroneData = async (): Promise<void> => {
  const droneData = await fetchDroneData()
  const violatingDrones: DroneData[] = []
  droneData.forEach(d => {
    const distance = calculateDistance(d)
    if (distance <= 100) {
      console.log('VIOLATING!')
      console.log(distance)
      violatingDrones.push(d)
    }
  })

  for (const drone of violatingDrones) {
    const response = await fetch('https://assignments.reaktor.com/birdnest/pilots/' + drone.serialNumber._text)
    if (response.status === 404) {
      return
    }
    if (!redisClient.isReady) {
      await redisClient.connect()
    }
    // Save the information in text and save it in the Redis cache
    const text = await response.text()
    const pilotInfo: PilotInfo = JSON.parse(text)
    try {
      console.log('Saving ' + pilotInfo.pilotId)
      const s = JSON.stringify(pilotInfo)
      console.log('Saving object')
      console.log(s)
      await redisClient.setEx(pilotInfo.pilotId, 600, text)
    } catch (e) {
      console.log('Could not save data in redis', e)
    }
  }
}

export default updateDroneData
