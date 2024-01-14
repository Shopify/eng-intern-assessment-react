import React from 'react'
import moment from 'moment';


interface LapTimesListProps {
  lapTimes: Array<number>;
}

export default function LapTimesList(lapTimesObject: LapTimesListProps) {

  const { lapTimes } = lapTimesObject

  let totalLapTime = 0

  return (
    <ul className='lap-times-list' >
      <h3>Lap Times List</h3>
      { lapTimes.map((lapTime, index) => {
        totalLapTime += lapTime;
        return (
          <li key={ lapTime }>
            <p>Lap { index + 1 } Time: { moment(lapTime).format("mm:ss:SS") } - Total Time: { moment(totalLapTime).format("mm:ss:SS") } </p>
          </li>
        )
      }) }
    </ul>

  )
}



