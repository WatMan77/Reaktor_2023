import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { PilotInfo } from '../types'

let socket: Socket

const Pilot = (): JSX.Element => {
  const [pilots, setPilots] = useState<PilotInfo[]>([])
  useEffect(() => {
    socket = io('ws://localhost:8080')
    socket.on('pilotInfo', (x: PilotInfo[]) => {
      setPilots(x.sort((a, b) => a.firstName < b.firstName ? -1 : 0))
    })

    return () => {
      socket.removeAllListeners()
    }
  }, [])
  return (
    <div>
      {pilots.map((p) =>
        <div key={p.pilotId}>
          <h1>
            {p.firstName} {p.lastName} {p.distanceToNest}
          </h1>
        </div>
      )}
    </div>
  )
}

export default Pilot
