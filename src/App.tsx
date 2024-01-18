import React from 'react'
import StopWatch from './StopWatch'

export default function App() {
  return(
    <>
      <style>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
      <main style={{ backgroundColor: 'black', height: '100vh', color: '#f0f0f0'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'monospace', fontWeight: 'bolder', color: '#4F5D75' }}>stopwatch</h1>
          <StopWatch />
        </div>
      </main>
    </>
  )
}