import React from 'react'
import moment from 'moment';

interface LapTimesListProps {
  lapTimes: Array<number>;
  setLapTimes: Function
}


export default function LapTimesList(lapTimesObject: LapTimesListProps) {

  const { lapTimes, setLapTimes } = lapTimesObject

  return (
    <ul className='lap-times-list' >
      <h3>Lap Times List</h3>
      {/* <p>{ lapTimes }</p> */ }

      { lapTimes.map((lapTime, index) => {
        return (
          <li>
            <p>Lap { index }: { moment(lapTime).format("mm:ss:SS") } </p>
          </li>
        )
      }) }

    </ul>

  )
}



