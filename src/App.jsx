import React from 'react'
import Clock from "./components/Clock"
import Calculator from './components/Calculator'

const App = () => {
  return (
    <div style={{gap:"20px" }}>
      <Clock/>
      <Calculator/>
    </div>
  )
}

export default App
