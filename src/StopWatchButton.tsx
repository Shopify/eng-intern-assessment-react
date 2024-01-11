import React from 'react';

interface StopWatchButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
