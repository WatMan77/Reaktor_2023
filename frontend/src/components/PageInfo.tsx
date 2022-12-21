import React from 'react'
import '../styles/PageInfo.css'

const PageInfo = (): JSX.Element => {
  return (
    <div className='page-info'>
      <h1>Reaktor Summer 2023 pre-assignment</h1>
      <p>
        This is page shows the people that in the last 10 minutes have gone
        within 100 meters of the loon preservation area. The 10 minutes start from
        the moment their drone enters the 100 meter radius and is seen by the equipment.
      </p>
      <h2>How does it work?</h2>
      <p>
        Application uses express in the backend and fetches the data from the reaktors server every 2 seconds.
        This data is the saved in a redis cache and each data point has a 10 minute expiry time.
        Frontend is made using React. Using Socket.IO the frontend receives the data from the backend which
        emits the data to all sockets that are connected to it.
      </p>
    </div>
  )
}

export default PageInfo
