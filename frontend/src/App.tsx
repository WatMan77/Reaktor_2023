import React from 'react'
import Pilot from './components/Pilot'
import PageInfo from './components/PageInfo'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <PageInfo />
      <Pilot />
    </div>
  )
}

export default App
