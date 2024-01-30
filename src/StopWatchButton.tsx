import React from 'react';
import { IStopWatchButtonProps } from './type/InterfaceSWBP';
import './css/App.css';

export default function StopWatchButton(props: IStopWatchButtonProps) {
  const handleButtonClick = () => {
    if (props.onClick) {
    props.onClick;
    }
  };

  return (
    <div className='stopwatch-controls-container'>
      <button onClick={handleButtonClick}>{props.type}</button>
    </div>
  );
}
