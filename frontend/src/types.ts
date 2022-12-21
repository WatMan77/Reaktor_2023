
// Every object in a drone data has a "_text". This simplifies the below interface
interface Data {
  _text: string
}

// Interface for the Drone data as "deviceInformation" and others are not needed
export interface Drone {
  serialNumber: Data
  model: Data
  manufacturer: Data
  mac: Data
  ipv4: Data
  ipv6: Data
  firmware: Data
  positionY: Data
  positionX: Data
  altitude: Data
  distanceToNest?: number
  timestamp?: string
}

export interface DroneData {
  drone: Drone[]
  _attributes: { snapshotTimestamp: string }
}

export interface PilotInfo {
  pilotId: string
  firstName: string
  lastName: string
  phoneNumber: string
  createdDt: string | Date
  email: string
  distanceToNest?: number
  timestamp: string
}
