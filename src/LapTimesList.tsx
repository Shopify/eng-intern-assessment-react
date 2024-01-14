import React from 'react'

interface LapTimesListProps {
  lapTimes: Array<number>;
  setLapTimes: Function
}


export default function LapTimesList(lapTimesObject: LapTimesListProps) {

  const { lapTimes, setLapTimes } = lapTimesObject

  return (
    <ul>
      <h3>Lap Times List</h3>
      { lapTimes.map((lapTime, index) => {
        <ul>
          <p>Lap: { index }</p>
          <p>Lap Time: { lapTime }</p>
          <p>Total Time: { lapTime }</p>
        </ul>
      }) }
    </ul>

  )
}



