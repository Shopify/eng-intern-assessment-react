import React from 'react'
import StopWatch from './StopWatch'

export default function App() {
  return(
    <>
      <style>
        {`
          body, html {
            margin: 0;
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>
      <main style={{ backgroundColor: 'black', height: '100vh', color: '#f0f0f0', fontFamily: 'sans-serif', overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'monospace', fontWeight: 'bolder', color: '#4F5D75' }}>stopwatch</h1>
          <StopWatch />
        </div>
      </main>
    </>
  )
}