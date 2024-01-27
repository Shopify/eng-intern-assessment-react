import React from 'react'
import '../styles/StopWatchButton.css';

export type StopWatchButtonProps = {
  onClick: () => void;
  label: string
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
      <div className='buttons-container'>
        <button className='StopWatchButton' onClick={props.onClick}>{props.label}</button>
      </div>
    );
}
