import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { PilotInfo } from '../types'
import '../styles/PilotTable.css'

let socket: Socket

// Function to parse the date string and return a nice way of showing the timestamp
const parseTimestamp = (pilot: PilotInfo): string => {
  const date = new Date(pilot.timestamp)

  const hours = ('0' + `${date.getHours()}`).slice(-2)
  const minutes = ('0' + `${date.getMinutes()}`).slice(-2)
  return `${hours}:${minutes}`
}

const Pilot = (): JSX.Element => {
  const [pilots, setPilots] = useState<PilotInfo[]>([])
  useEffect(() => {
    socket = io('ws://localhost:8080')
    socket.on('pilotInfo', (x: PilotInfo[]) => {
      setPilots(x.sort((a, b) => a.firstName < b.firstName ? -1 : 0))
    })

    // Stop listening to the socket when closeing the page / when componen is not rendered anymore
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
          <th>Closest distance</th>
          <th>Last seen</th>
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
