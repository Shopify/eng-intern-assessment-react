import React from 'react';
// import '../styles/StopWatchButton.css';

export type StopWatchButtonProps = {
  onClick: () => void;
  label: string
}

export default function StopWatchButton(props: StopWatchButtonProps) {
    return(
      <button className='StopWatchButton' onClick={props.onClick}>{props.label}</button>
    );
}
