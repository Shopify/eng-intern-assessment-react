import React from 'react'

interface Props {
    color: string;
    children?: React.ReactNode;
    onClick: () => void;
  }

export default function StopWatchButton({color, children, onClick}: Props) {
    return(
        <div>
            <button onClick={onClick} style={{backgroundColor: color}}>{children}</button>
        </div>
    );
}

