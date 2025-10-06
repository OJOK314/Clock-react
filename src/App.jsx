import React from 'react'
import Clock from "./components/Clock"
import Calculator from './components/Calculator'

const App = () => {
  return (
    <>
      <style>
        {`
          .app-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            gap: 20px;
            padding: 20px;
          }

          /* Responsive design for small devices */
          @media (max-width: 768px) {
            .app-container {
              flex-direction: column;
              align-items: center;
            }
          }
        `}
      </style>

      <div className="app-container">
        <Clock />
        <Calculator />
      </div>
    </>
  )
}

export default App
