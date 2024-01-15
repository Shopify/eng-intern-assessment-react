import React from 'react';

interface StopWatchButtonProps {
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function StopWatchButton({ onPress }: StopWatchButtonProps) {
    return(
        <div>
            <button onClick={onPress}>Start/Stop</button>
        </div>
    );
}
