import React from 'react'
import Clock from "./components/Clock"
import Calculator from './components/Calculator'

const App = () => {
  return (
    <div style={{backgroundColor:"orangered",marginLeft:"20px", padding:"50px", }}>
      <Clock/>
      <Calculator/>
    </div>
  )
}

export default App
