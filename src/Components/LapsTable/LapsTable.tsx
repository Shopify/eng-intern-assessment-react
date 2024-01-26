import React from 'react';
import { formatTime } from '../../utils/formatTime';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './LapsTable.css'

const LapsTable = () => {
  // get the timer state
  const timer = useSelector((state: RootState) => state.timer)

  // map out the laps 
  const laps = timer.laps.map((lap, i) => {
    return <div className='row'>
      {`Lap ${timer.laps.length - i }`}
      <li key={lap} >{formatTime(lap)}</li></div>
  })

  // return the table with lap times and current lap
  return (
    <ul className='list-container'>
      <div className='row'>
        {`Lap ${timer.laps.length+1}`}
        <li key={"runningLap"}>{formatTime(timer.laptime)}</li>
      </div>
      {laps}
    </ul>
  );
}

export default LapsTable;