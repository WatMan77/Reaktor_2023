import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { PilotInfo } from '../types'
import '../styles/PilotCard.css'

let socket: Socket

const parseTimestamp = (pilot: PilotInfo): string => {
  if (pilot.timestamp !== undefined) {
    const date = new Date(pilot.timestamp)

    const hours = ('0' + `${date.getHours()}`).slice(-2)
    const minutes = ('0' + `${date.getHours()}`).slice(-2)
    return `${hours}:${minutes}`
  } else {
    return '0'
  }
}

const Pilot = (): JSX.Element => {
  const [pilots, setPilots] = useState<PilotInfo[]>([])
  useEffect(() => {
    socket = io('ws://localhost:8080')
    socket.on('pilotInfo', (x: PilotInfo[]) => {
      // Change createdDt to a Date type and sort the list by first names
      // The date is saved as a string in redis anyway so there is no point in changing it in the backend
      setPilots(x.sort((a, b) => a.firstName < b.firstName ? -1 : 0))
    })

    return () => {
      socket.removeAllListeners()
    }
  }, [])
  return (
    <table className='pilots-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Pilot ID</th>
          <th>Distance</th>
          <th>Time</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {pilots.map((p) =>
          <tr key={p.pilotId} className='pilot'>
            <td>{p.firstName} {p.lastName}</td>
            <td>{p.pilotId}</td>
            <td>{p.distanceToNest?.toFixed(0)} meters</td>
            <td>{parseTimestamp(p)}</td>
            <td>{p.phoneNumber}</td>
            <td>{p.email}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Pilot
